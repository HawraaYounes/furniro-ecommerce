import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../entities/color.entity';
import { Not, Repository } from 'typeorm';
import { CreateColorDto } from '../dto/create-color.dto';
import { CommonResponses } from 'src/constants/responses/en/common-responses';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ColorResponses } from 'src/constants/responses/en/color-responses';
import { ConfigService } from '@nestjs/config';
import { UpdateColorDto } from '../dto/update-color.dto';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(Color)
        private colorRepository: Repository<Color>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private configService: ConfigService
    ) { }

    async create(payload: CreateColorDto) {
        try {
            const existingColor = await this.colorRepository.findOne({
                where: [
                    { name: payload.name },
                    { hexCode: payload.hexCode }
                ],
            });
            if (existingColor) {
                return ColorResponses.COLOR_ALREADY_EXISTS;
            }
            const color = this.colorRepository.create(payload);
            const savedColor = await this.colorRepository.save(color);

            // Clear categories cache on new category creation
            await this.cacheManager.del('colors');

            return {
                ...ColorResponses.COLOR_CREATED,
                data: savedColor,
            };
        } catch (error) {
            return CommonResponses.INTERNAL_SERVER_ERROR;
        }
    }

    async findAll() {
        try {
            // Check if colors are cached
            const cachedColors = await this.cacheManager.get('colors');
            if (cachedColors) {
                return {
                    ...ColorResponses.COLORS_RETRIEVED,
                    data: cachedColors,
                };
            }

            // Fetch colors from the database
            const colors = await this.colorRepository.find();
            if (!colors || colors.length === 0) {
                return ColorResponses.NO_COLORS_FOUND;
            }

            await this.cacheManager.set('colors', colors, this.configService.get<number>('CACHE_TTL'));
            return {
                ...ColorResponses.COLORS_RETRIEVED,
                data: colors,
            };
        } catch (error) {
            return CommonResponses.INTERNAL_SERVER_ERROR;
        }
    }

    async update(id: number, payload: UpdateColorDto) {
        try {
            // Check if the color exists
            const existingColor = await this.colorRepository.findOne({ where: { id } });
            if (!existingColor) {
                return ColorResponses.COLOR_NOT_FOUND;
            }
    
            // Check if a color with the new name already exists
            if (payload.name) {
                const colorWithSameName = await this.colorRepository.findOne({
                    where: { name: payload.name, id: Not(id) },
                });
                if (colorWithSameName) {
                    return ColorResponses.COLOR_ALREADY_EXISTS;
                }
            }
    
            // Check if a color with the new hexCode already exists
            if (payload.hexCode) {
                const colorWithSameHexCode = await this.colorRepository.findOne({
                    where: { hexCode: payload.hexCode, id: Not(id) },
                });
                if (colorWithSameHexCode) {
                    return ColorResponses.COLOR_ALREADY_EXISTS;
                }
            }
    
            // Update the color
            await this.colorRepository.update(id, payload);
    
            // Invalidate the cache for the updated color and colors list
            await this.cacheManager.del(`color:${id}`);
            await this.cacheManager.del('colors');
    
            // Fetch the updated color
            const updatedColor = await this.colorRepository.findOne({ where: { id } });
            return {
                ...ColorResponses.COLOR_UPDATED,
                data: updatedColor,
            };
        } catch (error) {
            console.error(error);
            return CommonResponses.INTERNAL_SERVER_ERROR;
        }
    }
    

}