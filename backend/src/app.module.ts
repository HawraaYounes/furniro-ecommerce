import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './redis-options';
import { Category } from './modules/category/category.entity';
import { Product } from './modules/product/product.entity';
import { ProductImage } from './modules/product/product-image.entity';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User,Category, Product, ProductImage],
      database: 'furniro-db',
      synchronize: true,
      //logging: true,
    }),
    CacheModule.registerAsync(RedisOptions),
    UserModule,AuthModule, ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}