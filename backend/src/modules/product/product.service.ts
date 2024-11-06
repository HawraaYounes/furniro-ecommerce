import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductParamsDto } from './dto/find-product.dto';
import { DeleteProductParamsDto } from './dto/delete-product.dto';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';
import { INTERNAL_SERVER_ERROR } from 'src/constants/responses/en/common/internal-server-error';
import { PRODUCT_CREATED } from 'src/constants/responses/en/product/product-created';
import { PRODUCTS_RETRIEVED } from 'src/constants/responses/en/product/products-retrieved';
import { PRODUCT_NOT_FOUND } from 'src/constants/responses/en/product/product-not-found';
import { PRODUCT_UPDATED } from 'src/constants/responses/en/product/product-updated';
import { PRODUCT_DELETED } from 'src/constants/responses/en/product/product-deleted';
import { NO_PRODUCTS_FOUND } from 'src/constants/responses/en/product/no-products-found';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(payload: CreateProductDto) {
    try {
      const product = this.productRepository.create(payload);
      const savedProduct = await this.productRepository.save(product);

      // Clear products cache on new product creation
      await this.cacheManager.del('products');

      return {
        ...PRODUCT_CREATED,
        data: savedProduct,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }

  async findAll() {
    try {
      const cachedProducts = await this.cacheManager.get('products');
      if (cachedProducts) {
        return {
          ...PRODUCTS_RETRIEVED,
          data: cachedProducts,
        };
      }

      const products = await this.productRepository.find({ relations: ['images'] });
      if (!products || products.length === 0) {
        return NO_PRODUCTS_FOUND;
      }

      // Cache the products data for 10 minutes
      await this.cacheManager.set('products', products, 600);

      return {
        ...PRODUCTS_RETRIEVED,
        data: products,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
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
        relations: ['images'],
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

      await this.productRepository.update(id, payload);

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
