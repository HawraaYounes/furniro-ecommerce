import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from "@nestjs/common";
  import { Request, Response } from "express";
  import * as fs from 'fs';

  @Catch(HttpException)
  export class UnlinkImagesExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const message = exception.getResponse() as { message: string };
      const files = request.files as Express.Multer.File[];
  
      if (files && Array.isArray(files)) {
        files.forEach((file) => {
          const filePath = `./uploads/products/${file.filename}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
  
      response.status(status).json({
        statusCode: status,
        message: message.message === undefined ? message : message.message,
        error: exception.name,
      });
    }
  }