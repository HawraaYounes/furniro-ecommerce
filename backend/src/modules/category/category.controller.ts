// src/category/category.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryParamsDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/get-category.dto';
import { DeleteCategoryParamsDto } from './dto/delete-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public-strategy';
@ApiTags('category')
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
    @ApiOperation({ summary: 'Retrieve all categories' })
    @ApiResponse({
        status: 200,
        description: 'The categories have been successfully retrieved.',
    })
    @ApiResponse({
        status: 204,
        description: 'No categories found.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    @Public()
    findAll(){
        return this.categoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific category by ID' })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully retrieved.',
        type: Category,
    })
    @ApiResponse({
        status: 404,
        description: 'The category with the given ID was not found.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    @Public()
    async findOne(@Param() params: FindCategoryParamsDto){
        return this.categoryService.findOne(params);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a specific category by ID' })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully updated.',
    })
    @ApiResponse({
        status: 404,
        description: 'The category with the given ID was not found.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    update(
        @Param() params: UpdateCategoryParamsDto, 
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoryService.update(params.id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific category by ID' })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully deleted.',
    })
    @ApiResponse({
        status: 404,
        description: 'The category with the given ID was not found.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    delete(@Param('id') params: DeleteCategoryParamsDto){
        return this.categoryService.delete(params);
    }
}
