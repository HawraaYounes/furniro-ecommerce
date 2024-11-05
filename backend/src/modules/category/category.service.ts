// src/category/category.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/get-category.dto';
import { DeleteCategoryParamsDto } from './dto/delete-category.dto';
import { CATEGORIES_RETRIEVED } from 'src/constants/responses/en/category/categories-retrieved';
import { STATUS_INTERNAL_SERVER_ERROR } from 'src/constants/codes/status-codes';
import { CATEGORY_CREATED } from 'src/constants/responses/en/category/category-created';
import { INTERNAL_SERVER_ERROR } from 'src/constants/responses/en/common/internal-server-error';
import { CATEGORY_ALREADY_EXISTS } from 'src/constants/responses/en/category/category-exists';

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
            // Create and save the new category
            const category = this.categoryRepository.create(payload);
            const savedCategory = await this.categoryRepository.save(category);
            return {
                ...CATEGORY_CREATED,
                data: savedCategory,
            };
        } catch (error) {
            // Handle unexpected errors
            return INTERNAL_SERVER_ERROR;
        }
    }

    async findAll() {
        try {
            const categories = await this.categoryRepository.find();
            if (!categories || categories.length === 0) {// Case 1: Check if no categories are found
                return {
                    message: "No categories found.",
                    data: []
                };
            }
            return { // Case 2: Successfully found categories
                ...CATEGORIES_RETRIEVED,
                data: categories
            };
        } catch (error) {
            throw new HttpException( // Case 3: Handle unexpected errors
                'An error occurred while retrieving categories.',
                STATUS_INTERNAL_SERVER_ERROR
            );
        }
    }

    findOne(params: FindCategoryParamsDto): Promise<Category> {
        return this.categoryRepository.findOne({ where: { id: params.id } });
    }

    async update(id: number, payload: UpdateCategoryDto): Promise<Category> {
        await this.categoryRepository.update(id, payload);
        return this.findOne({ id });
    }

    async remove(params: DeleteCategoryParamsDto): Promise<void> {
        await this.categoryRepository.delete(params.id);
    }
}
