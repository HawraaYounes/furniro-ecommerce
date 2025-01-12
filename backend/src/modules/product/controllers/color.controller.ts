import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Color } from "../entities/color.entity";
import { CreateColorDto } from "../dto/create-color.dto";
import { ColorService } from "../services/color.service";
import { Public } from "src/modules/auth/public-strategy";
import { UpdateColorDto } from "../dto/update-color.dto";

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

    @Get()
    @ApiOperation({ summary: 'Retrieve all colors' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved all colors.',
        type: [Color],
    })
    @ApiResponse({
        status: 404,
        description: 'No colors found.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    @Public()
    findAll() {
        return this.colorService.findAll();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a color by ID' })
    @ApiResponse({
        status: 200,
        description: 'Color successfully updated.',
    })
    @ApiResponse({
        status: 404,
        description: 'Color not found.',
    })
    @ApiResponse({
        status: 409,
        description: 'Color with the same name or hexCode already exists.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    update(@Param('id') id: number, @Body() updateColorDto: UpdateColorDto) {
        return this.colorService.update(id, updateColorDto);
    }
}
