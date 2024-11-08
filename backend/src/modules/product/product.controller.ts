import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductParamsDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductParamsDto } from './dto/delete-product.dto';
import { Public } from '../auth/public-strategy';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('create')
    @UseInterceptors(
      FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]) // 'images' is the field name for multiple files
    )
    async create(
      @Body() payload: CreateProductDto,
      @UploadedFiles() files: { images?: Express.Multer.File[] }
    ) {
      if (!files || !files.images || files.images.length === 0) {
        throw new BadRequestException('At least one image is required');
      }
      return this.productService.create(payload, files.images);
    }

    @Public()
    @Get()
    async findAll() {
        const response = await this.productService.findAll();
        return response;
    }

    @Public()
    @Get(':id')
    async findOne(@Param() params: FindProductParamsDto) {
        const response = await this.productService.findOne(params);
        return response;
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() payload: UpdateProductDto,
    ) {
        const response = await this.productService.update(id, payload);
        return response;
    }

    @Delete(':id')
    async delete(@Param() params: DeleteProductParamsDto) {
        const response = await this.productService.delete(params);
        return response;
    }

    @Post(':productId/images')
    async addImage(
        @Param('productId') productId: number,
        @Body('url') url: string,
    ) {
        const response = await this.productService.addImage(productId, url);
        return response;
    }
}
