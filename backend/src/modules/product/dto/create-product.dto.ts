import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

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
  tags: number[];
}
