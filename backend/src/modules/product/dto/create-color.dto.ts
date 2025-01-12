import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    hexCode: string;
}