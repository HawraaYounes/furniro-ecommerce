import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateProductDto } from './create-product.dto';


export class UpdateProductDto extends CreateProductDto {
    
}

export class UpdateProductParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; 
}