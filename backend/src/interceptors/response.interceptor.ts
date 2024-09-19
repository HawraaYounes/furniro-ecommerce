import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomHttpException } from './custom-http-exception'; // Adjust the path as necessary

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((res) => {
        // Handle success response
        return {
          success: true,
          statusCode: response.statusCode || HttpStatus.OK,
          message: res?.message || 'Operation successful',
          path: request.url,
          data: res?.data || res, // Handle data here
        };
      }),
      catchError((error) => {
        // Handle errors
        const statusCode = error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = error instanceof HttpException
          ? (error.getResponse() as any).message || 'Error occurred'
          : 'Internal server error';

        // Create and throw a custom HTTP exception
        const customError = new CustomHttpException(
          statusCode,
          message,
          request.url,
          null
        );

        return throwError(() => customError);
      }),
    );
  }
}
