import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Transactional } from 'typeorm-transactional';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { CategoryResponses } from 'src/constants/responses/en/categories.responses';
import { ProductResponses } from 'src/constants/responses/en/products.responses';
import { CommonResponses } from 'src/constants/responses/en/common-responses';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product-image.entity';
import { Category } from 'src/modules/category/category.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { FindProductParamsDto } from '../dto/find-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { DeleteProductParamsDto } from '../dto/delete-product.dto';
import { AddProductColorBodyDto, AddProductColorParamsDto } from 'src/modules/category/dto/add-product-color.dto';
import { Color } from '../entities/color.entity';
import { Tag } from '../entities/tag.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private configService: ConfigService
  ) { }

  @Transactional()
  async createProduct(dto: CreateProductDto, files: Express.Multer.File[]) {
    try {
      // Validate category existence
      const category = await this.categoryRepository.findOne({
        where: { id: dto.category_id },
      });
      if (!category) {
        return CategoryResponses.CATEGORY_NOT_FOUND;
      }

      // Validate tags existence
      const tags = await this.tagRepository.findBy({ id: In(dto.tags) });

      if (tags.length !== dto.tags.length) {
        return ProductResponses.INVALID_TAG_IDS;
      }

      // Validate colors existence
      const colors = await this.colorRepository.findBy({ id: In(dto.colors) });
      if (colors.length !== dto.colors.length) {
        return ProductResponses.INVALID_COLOR_IDS;
      }

      // Create product (initially without SKU)
      const product = this.productRepository.create({
        name: dto.name,
        summary: dto.summary,
        price: dto.price,
        category,
        description: dto.description,
        tags, // Pass the tags array (array of Tag entities)
        colors, // Pass the colors array (array of Color entities)
        sku: "", // Placeholder for now
      });

      // Save product to generate ID
      const savedProduct = await this.productRepository.save(product);

      // Generate SKU based on ID
      savedProduct.sku = `SKU-${savedProduct.id}`;

      // Update SKU in the database
      await this.productRepository.update(savedProduct.id, { sku: savedProduct.sku });

      // Save product images
      const images = files.map((file) => ({
        url: file.filename,
        product: savedProduct,
      }));
      await this.productImageRepository.save(images);

      // Invalidate cached products list
      await this.invalidateProductsCache();

      return {
        ...ProductResponses.PRODUCT_CREATED,
        data: savedProduct,
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }




  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const cacheKey = `products:page=${page}:limit=${limit}`;

    try {
      // Check cache
      const cachedProducts = await this.cacheManager.get<Product[]>(cacheKey);
      if (cachedProducts) {
        return {
          ...ProductResponses.PRODUCTS_RETRIEVED, data: cachedProducts, meta: {
            page,
            limit,
            total: cachedProducts.length,
            pageCount: Math.ceil(cachedProducts.length / limit),
          }
        }
      }

      // Fetch data from database
      const [products, total] = await this.productRepository.findAndCount({
        relations: ['images', 'category'],
        skip: (page - 1) * limit,
        take: limit,
      });
     
      if (products.length === 0) {
        return {
          ...ProductResponses.NO_PRODUCTS_FOUND, meta: {
            page,
            limit,
            total: 0,
            pageCount: 0,
          }
        };
      }

      const updatedProducts = products.map((product) => ({
        ...product,
        images: product.images.sort((a, b) => a.id - b.id).map((image) => ({
          ...image,
          url: `${this.configService.get<string>('BACKEND_BASE_URL')}/productImage/${image.url}`,
        })),
      }));

      // Cache the paginated products
      await this.cacheManager.set(cacheKey, updatedProducts, this.configService.get<number>('CACHE_TTL'));

      return {
        ...ProductResponses.PRODUCTS_RETRIEVED, data: updatedProducts, meta: {
          page,
          limit,
          total,
          pageCount: Math.ceil(total / limit),
        }
      };
    } catch (error) {
      console.error('Error in findAll:', error);
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }


  async findOne(params: FindProductParamsDto) {
    const cacheKey = `product:${params.id}`;
    try {
      // Check cache
      const cachedProduct = await this.cacheManager.get<Product>(cacheKey);
      if (cachedProduct) {
        return {
          ...ProductResponses.PRODUCTS_RETRIEVED,
          data: cachedProduct,
        };
      }

      // Fetch data from database
      const product = await this.productRepository.findOne({
        where: { id: params.id },
        relations: ['images', 'category', 'colors',"tags"],
        order: {
          images: { id: 'ASC' }, 
        },
      });

      if (!product) {
        return ProductResponses.PRODUCT_NOT_FOUND;
      }

      // Map image URLs for the fetched product
      const updatedProduct = {
        ...product,
        images: product.images.map((image) => ({
          ...image,
          url: `${this.configService.get<string>('BACKEND_BASE_URL')}/productImage/${image.url}`,
        })),
      };

      // Cache the updated product with mapped image URLs
      await this.cacheManager.set(cacheKey, updatedProduct, this.configService.get<number>('CACHE_TTL'));

      return {
        ...ProductResponses.PRODUCTS_RETRIEVED,
        data: updatedProduct,
      };
    } catch (error) {
      console.error('Error in findOne:', error);
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }



  async update(id: number, payload: UpdateProductDto) {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id },
      });

      if (!existingProduct) {
        return ProductResponses.PRODUCT_NOT_FOUND;
      }

      let foundTags = [];
      if (payload.tags && payload.tags.length > 0) {
        foundTags = await this.tagRepository.findBy({
          id: In(payload.tags), // Fetch Tag entities by their IDs
        });

        if (foundTags.length !== payload.tags.length) {
          return {
            ...ProductResponses.INVALID_TAGS,
            message: 'Some tags provided do not exist.',
          };
        }
      }

      // Perform the update without modifying the original payload
      const updatedProduct = await this.productRepository.save({
        id, // Ensure the product ID is included for the update
        ...payload,
        tags: foundTags, // Pass the resolved Tag entities
      });

      // Invalidate cache
      await this.invalidateProductCache(id);

      return {
        ...ProductResponses.PRODUCT_UPDATED,
        data: updatedProduct,
      };
    } catch (error) {
      console.error('Error in update:', error);
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }


  async delete(params: DeleteProductParamsDto) {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id: params.id },
      });

      if (!existingProduct) {
        return ProductResponses.PRODUCT_NOT_FOUND;
      }

      await this.productRepository.delete(params.id);

      // Invalidate cache
      await this.invalidateProductsCache();
      await this.invalidateProductCache(params.id);

      return ProductResponses.PRODUCT_DELETED;
    } catch (error) {
      console.error('Error in delete:', error);
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }

  async addImage(productId: number, url: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!product) {
        return ProductResponses.PRODUCT_NOT_FOUND;
      }

      const productImage = this.productImageRepository.create({ url, product });
      const savedImage = await this.productImageRepository.save(productImage);

      // Invalidate cache
      await this.invalidateProductCache(productId);

      return savedImage;
    } catch (error) {
      console.error('Error in addImage:', error);
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }

  /**
   * Helper method to invalidate product-related cache.
   */
  private async invalidateProductCache(productId: number) {
    await this.cacheManager.del(`product:${productId}`);
    await this.cacheManager.del('products');
  }

  /**
   * Helper method to invalidate all products cache.
   */
  private async invalidateProductsCache() {
    const keys = await this.cacheManager.store.keys('products:*');
    await Promise.all(keys.map((key) => this.cacheManager.del(key)));
  }
  async clearCache(): Promise<any> {
    try {
      // Clear all keys in Redis cache
      await this.cacheManager.reset(); // Clears all cached data
      return {
        success: true,
        message: 'Cache cleared successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error clearing cache',
        error: error.message,
      };
    }
  }

  async addProductColor(params: AddProductColorParamsDto, body: AddProductColorBodyDto) {
    const { id } = params;
    const { colors } = body;

    // Find the product by ID, including its associated colors
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['colors'],
    });

    if (!product) {
      return ProductResponses.PRODUCT_NOT_FOUND;
    }

    // Validate color IDs by checking against the color repository
    const validColors = await this.colorRepository.findBy({ id: In(colors) });
    const validColorIds = validColors.map((color) => color.id);
    const invalidColorIds = colors.filter((colorId) => !validColorIds.includes(colorId));

    if (invalidColorIds.length > 0) {
      return {
        ...ProductResponses.INVALID_COLOR_IDS,
        data: { invalidColorIds },
      };
    }

    // Check if all valid colors are already associated with the product
    const existingColorIds = product.colors.map((color) => color.id);
    const newColorIds = validColorIds.filter((colorId) => !existingColorIds.includes(colorId));

    if (newColorIds.length === 0) {
      return {
        ...ProductResponses.COLORS_ALREADY_ASSOCIATED,
        data: { existingColorIds },
      };
    }

    // Add only the new colors to the product
    const newColors = validColors.filter((color) => newColorIds.includes(color.id));
    product.colors = [...product.colors, ...newColors];

    // Save the product with updated colors
    await this.productRepository.save(product);

    return {
      ...ProductResponses.COLORS_ADDED,
      data: { addedColorIds: newColorIds },
    };
  }

}

