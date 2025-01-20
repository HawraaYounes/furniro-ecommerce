import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/category.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductImage } from './entities/product-image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Color } from './entities/color.entity';
import { ColorController } from './controllers/color.controller';
import { ColorService } from './services/color.service';
import { TagController } from './controllers/tag.controller';
import { TagService } from './services/tag.service';
import { Tag } from './entities/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductImage, Category, Color, Tag]),
    MulterModule.register({
        storage: diskStorage({
          destination: './uploads/products',
          filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
          },
        }),
      }),],
    controllers: [ProductController,ColorController, TagController],
    providers: [ProductService,ColorService, TagService],
})
export class ProductModule { }
