import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductImage } from './entities/product-image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Color } from './entities/color.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductImage, Category, Color]),
    MulterModule.register({
        storage: diskStorage({
          destination: './uploads/products',
          filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
          },
        }),
      }),],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }
