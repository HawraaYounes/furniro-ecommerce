// src/category/category.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/get-category.dto';
import { DeleteCategoryParamsDto } from './dto/delete-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    create(payload: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(payload);
        return this.categoryRepository.save(category);
    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
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
