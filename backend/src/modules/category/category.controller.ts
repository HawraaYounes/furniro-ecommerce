// src/category/category.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryParamsDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/get-category.dto';
import { DeleteCategoryParamsDto } from './dto/delete-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto){
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll(){
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: FindCategoryParamsDto): Promise<Category> {
        return this.categoryService.findOne(params);
    }

    @Put(':id')
    update(
        @Param() params: UpdateCategoryParamsDto, 
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<Category> {
        return this.categoryService.update(params.id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') params: DeleteCategoryParamsDto): Promise<void> {
        return this.categoryService.remove(params);
    }
}
