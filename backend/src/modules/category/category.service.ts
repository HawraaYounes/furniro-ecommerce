import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/get-category.dto';
import { DeleteCategoryParamsDto } from './dto/delete-category.dto';
import { ConfigService } from '@nestjs/config';
import { CategoryResponses } from 'src/constants/responses/en/categories.responses';
import { CommonResponses } from 'src/constants/responses/en/common-responses';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}

  async create(payload: CreateCategoryDto) {
    try {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: payload.name },
      });
      if (existingCategory) {
        return CategoryResponses.CATEGORY_ALREADY_EXISTS;
      }
      const category = this.categoryRepository.create(payload);
      const savedCategory = await this.categoryRepository.save(category);

      // Clear categories cache on new category creation
      await this.cacheManager.del('categories');

      return {
        ...CategoryResponses.CATEGORY_CREATED,
        data: savedCategory,
      };
    } catch (error) {
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }

  async findAll() {
    try {
      const cachedCategories = await this.cacheManager.get('categories');
      if (cachedCategories) {
        return {
          ...CategoryResponses.CATEGORIES_RETRIEVED,
          data: cachedCategories,
        };
      }

      const categories = await this.categoryRepository.find();
      if (!categories || categories.length === 0) {
        return CategoryResponses.NO_CATEGORIES_FOUND;
      }

      // Cache the categories data for 10 minutes
      await this.cacheManager.set('categories', categories, );

      return {
        ...CategoryResponses.CATEGORIES_RETRIEVED,
        data: categories,
      };
    } catch (error) {
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }

  async findOne(params: FindCategoryParamsDto) {
    try {
      const cacheKey = `category:${params.id}`;
      const cachedCategory = await this.cacheManager.get(cacheKey);
      if (cachedCategory) {
        return {
          ...CategoryResponses.CATEGORY_FOUND,
          data: cachedCategory,
        };
      }

      const category = await this.categoryRepository.findOne({
        where: { id: params.id },
      });
      if (!category) {
        return CategoryResponses.CATEGORY_NOT_FOUND;
      }

      // Cache the individual category for 10 minutes
      await this.cacheManager.set(cacheKey, category, this.configService.get<number>('CACHE_TTL') );

      return {
        ...CategoryResponses.CATEGORY_FOUND,
        data: category,
      };
    } catch (error) {
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }

  async update(id: number, payload: UpdateCategoryDto) {
    try {
      // Check if the category exists
      const existingCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!existingCategory) {
        return CategoryResponses.CATEGORY_NOT_FOUND;
      }
  
      // Check if a category with the new name already exists (and it's not the same category being updated)
      if (payload.name) {
        const categoryWithSameName = await this.categoryRepository.findOne({
          where: { name: payload.name, id: Not(id) },
        });
        if (categoryWithSameName) {
          return CategoryResponses.CATEGORY_ALREADY_EXISTS;
        }
      }
  
      // Update the category
      await this.categoryRepository.update(id, payload);
  
      // Invalidate the cache for the updated category and categories list
      await this.cacheManager.del(`category:${id}`);
      await this.cacheManager.del('categories');
  
      // Fetch the updated category
      const updatedCategory = await this.findOne({ id });
      return {
        ...CategoryResponses.CATEGORY_UPDATED,
        data: updatedCategory.data,
      };
    } catch (error) {
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }
  

  async delete(params: DeleteCategoryParamsDto) {
    try {
      const existingCategory = await this.categoryRepository.findOne({
        where: { id: params.id },
      });
      if (!existingCategory) {
        return CategoryResponses.CATEGORY_NOT_FOUND;
      }

      await this.categoryRepository.delete(params.id);

      // Invalidate the cache for the deleted category and categories list
      await this.cacheManager.del(`category:${params.id}`);
      await this.cacheManager.del('categories');

      return CategoryResponses.CATEGORY_DELETED;
    } catch (error) {
      return CommonResponses.INTERNAL_SERVER_ERROR;
    }
  }
}
