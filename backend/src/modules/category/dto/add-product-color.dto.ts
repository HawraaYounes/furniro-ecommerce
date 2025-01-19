import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class AddProductColorParamsDto  {
    @IsNotEmpty()
    @IsNumber()
    id: number; 
}

export class AddProductColorBodyDto {
    @IsNotEmpty()
    @IsArray()
    colors: number[]; 
}