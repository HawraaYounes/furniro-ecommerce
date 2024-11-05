// src/category/category.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryParamsDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/get-category.dto';
import { DeleteCategoryParamsDto } from './dto/delete-category.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new category' }) 
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully created.',
        type: Category, 
    })
    @ApiResponse({
        status: 409,
        description: 'Category already exists.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    create(@Body() createCategoryDto: CreateCategoryDto){
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll(){
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: FindCategoryParamsDto){
        return this.categoryService.findOne(params);
    }

    @Put(':id')
    update(
        @Param() params: UpdateCategoryParamsDto, 
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoryService.update(params.id, updateCategoryDto);
    }

    @Delete(':id')
    delete(@Param('id') params: DeleteCategoryParamsDto){
        return this.categoryService.delete(params);
    }
}
