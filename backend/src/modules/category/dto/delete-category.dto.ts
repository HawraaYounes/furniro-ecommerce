import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteCategoryParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; 
}