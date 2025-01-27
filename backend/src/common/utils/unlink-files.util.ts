import * as fs from 'fs';

export const unlinkFiles = (files: Express.Multer.File[]) => {
    files.forEach((file) => {
      const filePath = `./uploads/products/${file.filename}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  };
  