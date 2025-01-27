import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayNotEmpty, IsOptional, ValidateNested } from 'class-validator';

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

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) 
  @Type(() => Number) 
  tags: number[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) 
  @Type(() => Number) 
  colors: number[];
}
