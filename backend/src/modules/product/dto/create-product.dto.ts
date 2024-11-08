import { IsNotEmpty, IsNumber, IsString, IsArray, ArrayMinSize, Validate, IsOptional, IsBoolean } from 'class-validator';

class ImageDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;  // isFeatured can be optional, but only one image can have this set to true
}

class AtMostOneFeaturedImage {
  // Custom validation to ensure at most one image is featured
  validate(images: ImageDto[]): boolean {
    const featuredCount = images.filter((image) => image.isFeatured === true).length;
    return featuredCount <= 1;  // Only allow at most one image with isFeatured = true
  }

  defaultMessage() {
    return 'Only one image can be marked as featured';
  }
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one image is required' })  // Ensure at least one image
  @Validate(AtMostOneFeaturedImage, { message: 'Only one image can be marked as featured' })  // Custom validation for featured images
  images: ImageDto[];

  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}
