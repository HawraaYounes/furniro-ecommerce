import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from 'src/common/interfaces/response.interface';

export const CategoryResponses : Record<string, ApiResponse>= {
  CATEGORIES_RETRIEVED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Categories successfully retrieved',
    data: [],
  },

  CATEGORY_CREATED: {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Category successfully created',
    data: null,
  },

  CATEGORY_DELETED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category deleted successfully',
  },

  CATEGORY_ALREADY_EXISTS: {
    success: false,
    statusCode: StatusCodes.CONFLICT,
    message: 'Category with this name already exists',
  },

  CATEGORY_FOUND: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category found successfully',
    data: null,
  },

  CATEGORY_NOT_FOUND: {
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Category not found',
  },

  CATEGORY_UPDATED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category updated successfully',
    data: null,
  },

  NO_CATEGORIES_FOUND: {
    success: true,
    statusCode: StatusCodes.NO_CONTENT,
    message: 'No categories found',
    data: [],
  },
};
