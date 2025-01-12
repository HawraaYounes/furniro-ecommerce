import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from 'src/common/interfaces/response.interface';

export const ColorResponses: Record<string, ApiResponse> = {
    COLOR_CREATED: {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Color successfully created',
        data: null,
    },
    COLOR_ALREADY_EXISTS: {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Color with this name or hexCode already exists',
    },
};
