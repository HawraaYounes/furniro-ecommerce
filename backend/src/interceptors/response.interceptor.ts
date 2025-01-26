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
import { CustomHttpException } from './custom-http-exception'; 

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((res) => {
        console.log("-----------------1-------------")
        console.log("RES.....",res)
        // Handle success response
        const { statusCode, message, data, meta } = res; // Destructure `meta` from the service response

        return {
          success: true,
          statusCode: statusCode || HttpStatus.OK,
          message: message || 'Operation successful',
          path: request.url,
          method: request.method,
          ...(data && { data }), // Include `data` if it exists
          ...(meta && { meta }), // Include `meta` if it exists
        };
      }),
      catchError((error) => {
        // Handle errors
        console.log("-----------------2-------------")
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
          request.method,

        );
        return throwError(() => customError);
      }),
    );
  }
}

