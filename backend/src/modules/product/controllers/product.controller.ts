import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFiles, Query, UseFilters } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { FindProductParamsDto } from '../dto/find-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { DeleteProductParamsDto } from '../dto/delete-product.dto';
import { Public } from 'src/modules/auth/public-strategy';
import { AddProductColorBodyDto, AddProductColorParamsDto } from 'src/modules/category/dto/add-product-color.dto';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs';
import { UnlinkImagesExceptionFilter } from 'src/common/exceptions/unlink-images.exception';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseFilters(UnlinkImagesExceptionFilter)
  @UseInterceptors(
    FilesInterceptor("images", 10, {
      storage: diskStorage({
        destination: "./uploads/products",
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    })
  )
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    if (!files || files.length === 0) {
      throw new Error("At least one image must be uploaded.");
    }
    try {
      const result = await this.productService.createProduct(createProductDto, files);
     // Handle response status code
      if (result.statusCode !== StatusCodes.CREATED) {
        // Clean up uploaded files on failure
        files.forEach((file) => {
          const filePath = `./uploads/products/${file.filename}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Remove the file
          }
        });
        return result
      }

      return result;
    } catch (error) {
      // Clean up files on unexpected errors
      // files.forEach((file) => {
      //   const filePath = `./uploads/products/${file.filename}`;
      //   if (fs.existsSync(filePath)) {
      //     fs.unlinkSync(filePath); // Remove the file
      //   }
      // });

      console.error(error.message || "An error occurred during product creation.");
      // throw new Error("Failed to create product.");
    }
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

  @Post(':id/new-color')
  async addProductColor(@Param() params: AddProductColorParamsDto, @Body() body: AddProductColorBodyDto) {
    const response = await this.productService.addProductColor(params, body);
    return response;
  }

  //TODO: move this route for seperate controller
  @Get('/clear/cache')
  @Public()
  async clearCache() {
    return await this.productService.clearCache();
  }
}
