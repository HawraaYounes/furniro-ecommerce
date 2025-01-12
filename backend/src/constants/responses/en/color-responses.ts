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
    COLORS_RETRIEVED: {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Colors successfully retrieved',
        data: null,
    },
    NO_COLORS_FOUND: {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No colors found',
    },
    COLOR_UPDATED: {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Color successfully updated',
        data: null,
    },
    COLOR_NOT_FOUND: {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Color not found',
    },
};
