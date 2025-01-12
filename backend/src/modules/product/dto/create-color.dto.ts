import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateColorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: 'hexCode must be a valid hexadecimal color code',
    })
    hexCode: string;
}