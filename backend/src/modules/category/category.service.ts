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

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(payload: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(payload);
        return await this.categoryRepository.save(category);
    }

    async findAll() {
        try {
            const categories = await this.categoryRepository.find();
            // Case 1: Check if no categories are found
            if (!categories || categories.length === 0) {
                return {
                    message: "No categories found.",
                    data: []
                };
            }
            // Case 2: Successfully found categories
            return {
                ...CATEGORIES_RETRIEVED,
                data: categories
            };
        } catch (error) {
            // Case 3: Handle unexpected errors
            throw new HttpException(
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
