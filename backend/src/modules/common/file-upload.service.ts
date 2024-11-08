import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  handleFileUploads(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Validate files (check file type and size)
    const uploadedImages = files.map((file) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('Invalid file type');
      }

      if (file.size > maxSize) {
        throw new BadRequestException('File is too large');
      }

      const filename = `${Date.now()}-${file.originalname}`;
      const filePath = path.join('./uploads', filename);

      return { filePath }; // Return the file path
    });

    return uploadedImages;
  }
}
