import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteColorParamsDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
