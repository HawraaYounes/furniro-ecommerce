import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteProductParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
