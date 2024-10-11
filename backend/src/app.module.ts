import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './redis-options';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User],
      database: 'furniro-db',
      synchronize: true,
      //logging: true,
    }),
    CacheModule.register(RedisOptions),
    UserModule,AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}