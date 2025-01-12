import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Color } from "../entities/color.entity";
import { CreateColorDto } from "../dto/create-color.dto";
import { ColorService } from "../services/color.service";

@ApiTags('color')
@Controller('colors')
export class ColorController {
    constructor(private readonly colorService: ColorService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new color' }) 
    @ApiResponse({
        status: 201,
        description: 'The color has been successfully created.',
        type: Color, 
    })
    @ApiResponse({
        status: 409,
        description: 'Color already exists.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    create(@Body() createColorDto: CreateColorDto){
        return this.colorService.create(createColorDto);
    }
}
