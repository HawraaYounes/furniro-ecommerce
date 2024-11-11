import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductParamsDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductParamsDto } from './dto/delete-product.dto';
import { Public } from '../auth/public-strategy';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseInterceptors(FilesInterceptor('images')) // Handle multiple files
    async addProduct(
      @Body() createProductDto: CreateProductDto,
      @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        console.log("dto:   ",createProductDto)
        console.log("files:    ",files)
      // Assuming files are uploaded and URLs are generated (for demonstration)
      const imageUrls = files.map(file => ({
        url: `/uploads/products/${file.filename}`,  // Adjust this as per actual file URL/path
        isFeatured: false, // Adjust as per your requirement
      }));
      
      createProductDto.images = imageUrls;
  
      return this.productService.createProduct(createProductDto);
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
