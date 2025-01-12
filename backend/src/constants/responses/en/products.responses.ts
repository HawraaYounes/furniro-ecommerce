import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from 'src/common/interfaces/response.interface';

export const ProductResponses : Record<string, ApiResponse>= {
  NO_PRODUCTS_FOUND: {
    success: true,
    statusCode: StatusCodes.NO_CONTENT,
    message: 'No Products found',
    data: [],
  },

  PRODUCT_CREATED: {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Product successfully created',
    data: null,
  },

  PRODUCT_DELETED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product successfully deleted',
  },

  PRODUCT_ALREADY_EXISTS: {
    success: false,
    statusCode: StatusCodes.CONFLICT,
    message: 'Product with this name already exists',
  },

  PRODUCT_FOUND: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product found successfully',
    data: null,
  },

  PRODUCT_NOT_FOUND: {
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Product not found',
  },

  PRODUCT_UPDATED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product successfully updated',
    data: null,
  },

  PRODUCTS_RETRIEVED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Products successfully retrieved',
    data: [],
  },
};
