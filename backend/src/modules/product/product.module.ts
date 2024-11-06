import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductImage } from './product-image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductImage, Category])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}