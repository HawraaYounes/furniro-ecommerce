import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
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
  @MinLength(50)
  @MaxLength(400)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) 
  @Type(() => Number) 
  tags: Tag[];

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) 
  @Type(() => Number) 
  colors: Color[];
}
