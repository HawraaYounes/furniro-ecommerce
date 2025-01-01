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
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/entities/product.entity';
import { ProductImage } from './modules/product/entities/product-image.entity';
import { DataSource } from 'typeorm';
import { initializeTransactionalContext, addTransactionalDataSource, StorageDriver, getDataSourceByName } from 'typeorm-transactional';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'furniro-db',
          entities: [User, Category, Product, ProductImage],
          synchronize: true,
          // logging: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) throw new Error('Invalid options passed');
        const dataSource = new DataSource(options);
        
        // Initialize transactional context
        initializeTransactionalContext({ storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE });

        // Add the data source for transactional handling
        return getDataSourceByName('default') || addTransactionalDataSource(new DataSource(options));
      },
    }),
    CacheModule.registerAsync(RedisOptions),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
