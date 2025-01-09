import { StatusCodes } from 'http-status-codes';

export const CommonResponses = {
  INTERNAL_SERVER_ERROR: {
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error!',
    data: null,
  },
};
