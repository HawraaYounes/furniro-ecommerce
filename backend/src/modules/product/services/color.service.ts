import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../entities/color.entity';
import { Repository } from 'typeorm';
import { CreateColorDto } from '../dto/create-color.dto';
import { CommonResponses } from 'src/constants/responses/en/common-responses';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ColorResponses } from 'src/constants/responses/en/color-responses';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(Color)
        private colorRepository: Repository<Color>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

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

}