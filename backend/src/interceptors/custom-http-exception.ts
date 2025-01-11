import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly path: string,
    ) {
        super(
            {
                success: false,
                statusCode,
                message,
                path,
            },
            statusCode
        );
    }
}
