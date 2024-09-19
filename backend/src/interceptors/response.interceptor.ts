// src/interceptors/response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // Handle successful responses with a standard format
        return {
          success: true,
          statusCode: context.switchToHttp().getResponse().statusCode || 200,
          message: data.message || 'Request successful',
          path: context.switchToHttp().getRequest().url,
          data: data.data || data,
        };
      }),
      catchError((error: HttpException) => {
        // Handle error responses with a standard format
        const statusCode = error.getStatus();
        const response = error.getResponse();

        return throwError(() => ({
          success: false,
          statusCode,
          message: response['message'] || 'An error occurred',
          path: context.switchToHttp().getRequest().url,
          data: null,
        }));
      }),
    );
  }
}
