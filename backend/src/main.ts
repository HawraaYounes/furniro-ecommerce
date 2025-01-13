import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE }); // Initialize context
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Get ConfigService instance
  
  // Enable CORS with specific options
  app.enableCors({
    origin: configService.get<string>('FRONTEND_BASE_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable global response interceptor 
  app.useGlobalInterceptors(new ResponseInterceptor());
  
  const config = new DocumentBuilder()
    .setTitle('Furniro Furniture API')
    .setDescription('API documentation for the Furniro e-commerce platform')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('category')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
