import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindProductParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number; 
}
