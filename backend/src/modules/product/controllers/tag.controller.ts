import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Tag } from "../entities/tag.entity";
import { CreateTagDto } from "../dto/create-tag.dto";
import { TagService } from "../services/tag.service";
import { Public } from "src/modules/auth/public-strategy";
import { UpdateTagDto } from "../dto/update-tag.dto";
import { DeleteTagParamsDto } from "../dto/delete-tag.dto";

@ApiTags('tag')
@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new tag' }) 
    @ApiResponse({
        status: 201,
        description: 'The tag has been successfully created.',
        type: Tag, 
    })
    @ApiResponse({
        status: 409,
        description: 'Tag already exists.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all tags' })
    @ApiResponse({
        status: 200,
        description: 'Tags successfully retrieved.',
    })
    @ApiResponse({
        status: 404,
        description: 'No tags found.',
    })
    findAll() {
        return this.tagService.findAll();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a tag by id' })
    @ApiResponse({
        status: 200,
        description: 'The tag has been successfully updated.',
        type: Tag,
    })
    @ApiResponse({
        status: 404,
        description: 'Tag not found.',
    })
    update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(id, updateTagDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a tag by id' })
    @ApiResponse({
        status: 200,
        description: 'The tag has been successfully deleted.',
    })
    @ApiResponse({
        status: 404,
        description: 'Tag not found.',
    })
    delete(@Param('id') id: number) {
        return this.tagService.delete(id);
    }
}
