import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(HttpException)
  export class UnlinkImagesExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const message = exception.getResponse() as { message: string };
      console.log(
        'This is a log of exception object {} from Unlink Images Exception Filter !',
      );
      console.log(
        '**************************************************************',
      );
      console.log(exception);
      console.log(
        '*************************************************************',
      );
  
      response.status(status).json({
        statusCode: status,
        message: message.message === undefined ? message : message.message,
        error: exception.name,
      });
    }
  }