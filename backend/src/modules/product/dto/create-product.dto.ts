// create-product.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsBoolean, ArrayMinSize } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;


}
