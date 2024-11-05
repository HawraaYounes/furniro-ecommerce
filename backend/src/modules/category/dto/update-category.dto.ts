import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
    
}

export class UpdateCategoryParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; 
}