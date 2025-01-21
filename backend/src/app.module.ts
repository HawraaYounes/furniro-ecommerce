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
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Color } from './modules/product/entities/color.entity';
import { Tag } from './modules/product/entities/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Specify the path to your .env file
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/products'), // Path to the static files
      serveRoot: '/productImage', // The route prefix for accessing the files
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Category, Product, ProductImage, Color, Tag],
        synchronize: true,
        // logging: true,
      }),
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
