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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(payload: CreateCategoryDto) {
    try {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: payload.name },
      });
      if (existingCategory) {
        return CATEGORY_ALREADY_EXISTS;
      }
      const category = this.categoryRepository.create(payload);
      const savedCategory = await this.categoryRepository.save(category);

      // Clear categories cache on new category creation
      await this.cacheManager.del('categories');

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
      const cachedCategories = await this.cacheManager.get('categories');
      if (cachedCategories) {
        return {
          ...CATEGORIES_RETRIEVED,
          data: cachedCategories,
        };
      }

      const categories = await this.categoryRepository.find();
      if (!categories || categories.length === 0) {
        return NO_CATEGORIES_FOUND;
      }

      // Cache the categories data for 10 minutes
      await this.cacheManager.set('categories', categories, 600);

      return {
        ...CATEGORIES_RETRIEVED,
        data: categories,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }

  async findOne(params: FindCategoryParamsDto) {
    try {
      const cacheKey = `category:${params.id}`;
      const cachedCategory = await this.cacheManager.get(cacheKey);
      if (cachedCategory) {
        return {
          ...CATEGORY_FOUND,
          data: cachedCategory,
        };
      }

      const category = await this.categoryRepository.findOne({
        where: { id: params.id },
      });
      if (!category) {
        return CATEGORY_NOT_FOUND;
      }

      // Cache the individual category for 10 minutes
      await this.cacheManager.set(cacheKey, category, 600);

      return {
        ...CATEGORY_FOUND,
        data: category,
      };
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }

  async update(id: number, payload: UpdateCategoryDto) {
    try {
      // Check if the category exists
      const existingCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!existingCategory) {
        return CATEGORY_NOT_FOUND;
      }
  
      // Check if a category with the new name already exists (and it's not the same category being updated)
      if (payload.name) {
        const categoryWithSameName = await this.categoryRepository.findOne({
          where: { name: payload.name, id: Not(id) },
        });
        if (categoryWithSameName) {
          return CATEGORY_ALREADY_EXISTS;
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
        ...CATEGORY_UPDATED,
        data: updatedCategory.data,
      };
    } catch (error) {
      console.log(error);
      return INTERNAL_SERVER_ERROR;
    }
  }
  

  async delete(params: DeleteCategoryParamsDto) {
    try {
      const existingCategory = await this.categoryRepository.findOne({
        where: { id: params.id },
      });
      if (!existingCategory) {
        return CATEGORY_NOT_FOUND;
      }

      await this.categoryRepository.delete(params.id);

      // Invalidate the cache for the deleted category and categories list
      await this.cacheManager.del(`category:${params.id}`);
      await this.cacheManager.del('categories');

      return CATEGORY_DELETED;
    } catch (error) {
      return INTERNAL_SERVER_ERROR;
    }
  }
}
