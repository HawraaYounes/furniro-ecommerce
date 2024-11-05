import { IsNotEmpty, IsNumber } from "class-validator";

export class FindCategoryParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; // Parameter for the category ID
}