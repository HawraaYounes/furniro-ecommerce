import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from 'src/common/interfaces/response.interface';

export const CommonResponses: Record<string, ApiResponse> = {
  INTERNAL_SERVER_ERROR: {
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error!',
  },
};
