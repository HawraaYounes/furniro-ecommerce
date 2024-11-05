// src/category/category.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryParamsDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    update(
        @Param() params: UpdateCategoryParamsDto, 
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<Category> {
        return this.categoryService.update(params.id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.categoryService.remove(id);
    }
}
