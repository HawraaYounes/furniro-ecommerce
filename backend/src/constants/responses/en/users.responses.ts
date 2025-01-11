import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from 'src/common/interfaces/response.interface';

export const UserResponses: Record<string, ApiResponse> = {
  USER_CREATED: {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User successfully created',
    data: null,
  },

  USER_NOT_FOUND: {
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: 'User not found.',
  },

  USERS_RETRIEVED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users successfully retrieved',
    data: [],
  },
};
