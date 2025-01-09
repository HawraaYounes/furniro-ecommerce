import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../../modules/user/user.module";
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './roles.guard';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported to use ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Fetch secret from .env
        signOptions: { expiresIn: '1d' }, // Token expiration time
      }),
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    CategoryModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
