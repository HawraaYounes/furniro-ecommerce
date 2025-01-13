import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private configService: ConfigService
  ) { }

  @Transactional()
  async createProduct(dto: CreateProductDto, files: Express.Multer.File[]) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.category_id },
      });

      if (!category) {
        return CategoryResponses.CATEGORY_NOT_FOUND;
      }

      const product = this.productRepository.create({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        category,
      });

      const savedProduct = await this.productRepository.save(product);

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
      console.error('Error in createProduct:', error);
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
        images: product.images.map((image) => ({
          ...image,
          url: `${this.configService.get<string>('BACKEND_BASE_URL')}/productImage/${image.url}`,        })),
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
        relations: ['images', 'category'],
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
  
      // Update cache
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

      // Update the product
      await this.productRepository.update(id, payload);

      // Invalidate cache
      await this.invalidateProductCache(id);

      // Fetch updated product
      const updatedProduct = await this.findOne({ id });
      return {
        ...ProductResponses.PRODUCT_UPDATED,
        data: updatedProduct.data,
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

}

