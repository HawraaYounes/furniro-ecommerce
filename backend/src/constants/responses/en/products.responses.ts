import { StatusCodes } from 'http-status-codes';

export const ProductResponses = {
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
    data: null,
  },

  PRODUCT_ALREADY_EXISTS: {
    success: false,
    statusCode: StatusCodes.CONFLICT,
    message: 'Product with this name already exists',
    data: null,
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
    data: null,
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
