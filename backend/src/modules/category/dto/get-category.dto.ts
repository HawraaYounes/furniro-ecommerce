import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class FindCategoryParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; 
}