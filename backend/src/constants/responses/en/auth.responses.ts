import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from 'src/common/interfaces/response.interface';

export const AuthResponses: Record<string, ApiResponse> = {
  EMAIL_ALREADY_REGISTERED: {
    success: false,
    statusCode: StatusCodes.CONFLICT,
    message: 'Email address is already registered. Please use a different email or log in.',
  },
  
  INVALID_PASSWORD: {
    success: false,
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Incorrect email and password!',
  },

  LOGIN_SUCCESS: {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User successfully logged in',
    data: null,
  },

  SIGNUP_SUCCESS: {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User successfully signed up',
    data: null,
  },
};
