import { StatusCodes } from 'http-status-codes';

export const AuthResponses = {
  EMAIL_ALREADY_REGISTERED: {
    success: false,
    statusCode: StatusCodes.CONFLICT,
    message: 'Email address is already registered. Please use a different email or log in.',
    data: null,
  },
  
  INVALID_PASSWORD: {
    success: false,
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Incorrect email and password!',
    data: null,
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
