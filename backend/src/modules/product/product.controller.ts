import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductParamsDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductParamsDto } from './dto/delete-product.dto';
import { Public } from '../auth/public-strategy';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseInterceptors(
      FilesInterceptor('images', 10, {
        storage: diskStorage({
          destination: './uploads/products',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async createProduct(
      @Body() createProductDto: CreateProductDto,
      @UploadedFiles() files: Express.Multer.File[],
    ) {
      if (files.length === 0) {
        throw new Error('At least one image must be uploaded.');
      }
      return this.productService.createProduct(createProductDto, files);
    }
    
    @Public()
    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
      return this.productService.findAll(paginationDto);
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
