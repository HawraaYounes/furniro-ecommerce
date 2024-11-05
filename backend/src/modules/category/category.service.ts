// src/category/category.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    create(payload:CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(payload);
        return this.categoryRepository.save(category);
    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ where: { id } });
    }

    async update(id: number, payload: UpdateCategoryDto): Promise<Category> {
        await this.categoryRepository.update(id, payload);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
