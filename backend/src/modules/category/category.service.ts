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
        const categories = await this.categoryRepository.find();
        return {
            ...CATEGORIES_RETRIEVED,
            data: categories
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
