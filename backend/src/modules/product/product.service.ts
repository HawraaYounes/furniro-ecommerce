import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { INTERNAL_SERVER_ERROR } from 'src/constants/responses/en/common/internal-server-error';
import { PRODUCT_CREATED } from 'src/constants/responses/en/product/product-created';
import { PRODUCTS_RETRIEVED } from 'src/constants/responses/en/product/products-retrieved';
import { PRODUCT_NOT_FOUND } from 'src/constants/responses/en/product/product-not-found';
import { PRODUCT_UPDATED } from 'src/constants/responses/en/product/product-updated';
import { PRODUCT_DELETED } from 'src/constants/responses/en/product/product-deleted';
import { NO_PRODUCTS_FOUND } from 'src/constants/responses/en/product/no-products-found';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductParamsDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductParamsDto } from './dto/delete-product.dto';
import { Category } from '../category/category.entity';
import { Transactional } from 'typeorm-transactional';
import { buildResponse } from 'src/common/utils/response-builder';
import { PaginationDto } from 'src/common/dto/pagination.dto';


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
  
  ) {}

  @Transactional()
  async createProduct(dto: CreateProductDto, files: Express.Multer.File[]) {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.category_id },
    });
    try {
      const product = this.productRepository.create({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        category: category
      });
  
      const savedProduct = await this.productRepository.save(product);
      const images = files.map((file) => ({
        url: file.filename,
        product: savedProduct,
      }));
  
      await this.productImageRepository.save(images);

       // Invalidate cached products data
       await this.cacheManager.del('products');
  
      return {
        ...PRODUCT_CREATED,
        data: savedProduct, 
      };
    } catch (error) {
      console.log("ERROR:",error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
  
    try {
      const cacheKey = `products:page:${page}:limit:${limit}`;
      const cachedProducts = await this.cacheManager.get<Product[]>(cacheKey);
  
      if (cachedProducts && Array.isArray(cachedProducts)) {
        return buildResponse(PRODUCTS_RETRIEVED, cachedProducts, {
          page,
          limit,
          total: cachedProducts.length,
          pageCount: Math.ceil(cachedProducts.length / limit),
        });
      }
  
      const [products, total] = await this.productRepository.findAndCount({
        relations: ['images', 'category'],
        skip: (page - 1) * limit,
        take: limit,
      });
  
      if (products.length === 0) {
        return buildResponse(NO_PRODUCTS_FOUND, [], {
          page,
          limit,
          total: 0,
          pageCount: 0,
        });
      }
  
      const updatedProducts = products.map((product) => ({
        ...product,
        images: product.images.map((image) => ({
          ...image,
          url: `http://localhost:3000/productImage/${image.url}`,
        })),
      }));
  
      // Cache the paginated response
      await this.cacheManager.set(cacheKey, updatedProducts, 600);
  
      return buildResponse(PRODUCTS_RETRIEVED, updatedProducts, {
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
      });
    } catch (error) {
      return buildResponse(INTERNAL_SERVER_ERROR, null);
    }
  }
  

  async findOne(params: FindProductParamsDto) {
    try {
      const cacheKey = `product:${params.id}`;
      const cachedProduct = await this.cacheManager.get(cacheKey);
      if (cachedProduct) {
        return {
          ...PRODUCTS_RETRIEVED,
          data: cachedProduct,
        };
      }

      const product = await this.productRepository.findOne({
        where: { id: params.id },
        relations: ['images','category'],
      });
      if (!product) {
        return PRODUCT_NOT_FOUND;
      }

      // Cache the individual product for 10 minutes
      await this.cacheManager.set(cacheKey, product, 600);

      return {
        ...PRODUCTS_RETRIEVED,
        data: product,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }

  async update(id: number, payload: UpdateProductDto) {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id },
      });
      if (!existingProduct) {
        return PRODUCT_NOT_FOUND;
      }

     // await this.productRepository.update(id, payload);

      // Invalidate the cache for the updated product and products list
      await this.cacheManager.del(`product:${id}`);
      await this.cacheManager.del('products');

      // Fetch the updated product
      const updatedProduct = await this.findOne({ id });
      return {
        ...PRODUCT_UPDATED,
        data: updatedProduct.data,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }

  async delete(params: DeleteProductParamsDto) {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id: params.id },
      });
      if (!existingProduct) {
        return PRODUCT_NOT_FOUND;
      }

      await this.productRepository.delete(params.id);

      // Invalidate the cache for the deleted product and products list
      await this.cacheManager.del(`product:${params.id}`);
      await this.cacheManager.del('products');

      return PRODUCT_DELETED;
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }

  async addImage(productId: number, url: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        return PRODUCT_NOT_FOUND;
      }

      const productImage = this.productImageRepository.create({ url, product });
      const savedImage = await this.productImageRepository.save(productImage);

      // Invalidate the product cache to update with the new image
      await this.cacheManager.del(`product:${productId}`);
      await this.cacheManager.del('products');

      return savedImage;
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }
}
