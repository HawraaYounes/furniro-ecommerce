import { StatusCodes } from 'http-status-codes';

export const UserResponses = {
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
    data: null,
  },

  USERS_RETRIEVED: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users successfully retrieved',
    data: [],
  },
};
