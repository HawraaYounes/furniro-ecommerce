import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from 'src/common/interfaces/response.interface';

export const TagResponses: Record<string, ApiResponse> = {
    TAG_CREATED: {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Tag successfully created',
        data: null,
    },
    TAG_ALREADY_EXISTS: {
        success: false,
        statusCode: StatusCodes.CONFLICT,
        message: 'Tag with this name already exists',
    },
    TAGS_RETRIEVED: {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Tags successfully retrieved',
        data: null,
    },
    NO_TAGS_FOUND: {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No tags found',
    },
    TAG_UPDATED: {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Tag successfully updated',
        data: null,
    },
    TAG_NOT_FOUND: {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Tag not found',
    },
    TAG_DELETED: {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Tag successfully deleted',
    },
};
