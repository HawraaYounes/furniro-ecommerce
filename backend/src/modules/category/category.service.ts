// src/category/category.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/get-category.dto';
import { DeleteCategoryParamsDto } from './dto/delete-category.dto';
import { CATEGORIES_RETRIEVED } from 'src/constants/responses/en/category/categories-retrieved';
import { CATEGORY_CREATED } from 'src/constants/responses/en/category/category-created';
import { INTERNAL_SERVER_ERROR } from 'src/constants/responses/en/common/internal-server-error';
import { CATEGORY_ALREADY_EXISTS } from 'src/constants/responses/en/category/category-exists';
import { CATEGORY_FOUND } from 'src/constants/responses/en/category/category-found';
import { CATEGORY_NOT_FOUND } from 'src/constants/responses/en/category/category-not-found';
import { CATEGORY_UPDATED } from 'src/constants/responses/en/category/category-updated';
import { CATEGORY_DELETED } from 'src/constants/responses/en/category/category-deleted';
import { NO_CATEGORIES_FOUND } from 'src/constants/responses/en/category/no-categories-found';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(payload: CreateCategoryDto) {
        try {
            const existingCategory = await this.categoryRepository.findOne({
                where: { name: payload.name },
            });
            if (existingCategory) { // Check for duplicate category name
                return CATEGORY_ALREADY_EXISTS;
            }
            const category = this.categoryRepository.create(payload); // Create and save the new category
            const savedCategory = await this.categoryRepository.save(category);
            return {
                ...CATEGORY_CREATED,
                data: savedCategory,
            };
        } catch (error) {
            return INTERNAL_SERVER_ERROR;
        }
    }

    async findAll() {
        try {
            const categories = await this.categoryRepository.find();
            if (!categories || categories.length === 0) {// Check if no categories are found
                return NO_CATEGORIES_FOUND;
            }
            return { // Successfully found categories
                ...CATEGORIES_RETRIEVED,
                data: categories
            };
        } catch (error) {
            return INTERNAL_SERVER_ERROR;
        }
    }

    async findOne(params: FindCategoryParamsDto) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: params.id },
            });
            if (!category) { // Category Not Found
                return CATEGORY_FOUND;
            }
            return { // Category Found
                ...CATEGORY_FOUND,
                data: category,
            };
        } catch (error) {
            return INTERNAL_SERVER_ERROR;  // Handle unexpected errors
        }
    }

    async update(id: number, payload: UpdateCategoryDto) {
        try {
            const existingCategory = await this.categoryRepository.findOne({ where: { id } });
            if (!existingCategory) { // Category Not Found
                return CATEGORY_NOT_FOUND;
            }
            await this.categoryRepository.update(id, payload);
            // Fetch the updated category
            const updatedCategory = await this.findOne({ id });
            return {
                ...CATEGORY_UPDATED,
                data: updatedCategory.data,
            };
        } catch (error) {
            return INTERNAL_SERVER_ERROR;
        }
    }

    async delete(params: DeleteCategoryParamsDto) {
        try {
            const existingCategory = await this.categoryRepository.findOne({ where: { id: params.id } });
            if (!existingCategory) { // Category Not Found
                return CATEGORY_NOT_FOUND;
            }
            await this.categoryRepository.delete(params.id);
            return CATEGORY_DELETED; // Successfully deleted
        } catch (error) {
            return INTERNAL_SERVER_ERROR
        }
    }
    
}
