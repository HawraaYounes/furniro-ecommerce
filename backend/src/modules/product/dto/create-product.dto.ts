import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Color } from '../entities/color.entity';
import { Tag } from '../entities/tag.entity';

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

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) 
  @Type(() => Number) 
  tags: Tag[];

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) 
  @Type(() => Number) 
  colors: Color[];
}
