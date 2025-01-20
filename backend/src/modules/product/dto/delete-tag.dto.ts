import { IsInt } from 'class-validator';

export class DeleteTagParamsDto {
    @IsInt()
    id: number;
}
