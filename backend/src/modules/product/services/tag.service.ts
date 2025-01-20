import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { CommonResponses } from 'src/constants/responses/en/common-responses';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { DeleteTagParamsDto } from '../dto/delete-tag.dto'
import { TagResponses } from 'src/constants/responses/en/tags.responses';


@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private configService: ConfigService
    ) {}

    async create(payload: CreateTagDto) {
        try {
            const existingTag = await this.tagRepository.findOne({ where: { name: payload.name } });
            if (existingTag) {
                return TagResponses.TAG_ALREADY_EXISTS;
            }

            const tag = this.tagRepository.create(payload);
            const savedTag = await this.tagRepository.save(tag);

            // Clear tags cache on new tag creation
            await this.cacheManager.del('tags');

            return {
                ...TagResponses.TAG_CREATED,
                data: savedTag,
            };
        } catch (error) {
            return CommonResponses.INTERNAL_SERVER_ERROR;
        }
    }

    async findAll() {
        try {
            const cachedTags = await this.cacheManager.get('tags');
            if (cachedTags) {
                return { ...TagResponses.TAGS_RETRIEVED, data: cachedTags };
            }

            const tags = await this.tagRepository.find();
            if (!tags.length) {
                return TagResponses.NO_TAGS_FOUND;
            }

            await this.cacheManager.set('tags', tags, this.configService.get<number>('CACHE_TTL'));

            return {
                ...TagResponses.TAGS_RETRIEVED,
                data: tags,
            };
        } catch (error) {
            return CommonResponses.INTERNAL_SERVER_ERROR;
        }
    }

    async update(id: number, payload: UpdateTagDto) {
        try {
            const tag = await this.tagRepository.findOne({ where: { id } });
            if (!tag) {
                return TagResponses.TAG_NOT_FOUND;
            }

            tag.name = payload.name || tag.name;
            const updatedTag = await this.tagRepository.save(tag);

            return {
                ...TagResponses.TAG_UPDATED,
                data: updatedTag,
            };
        } catch (error) {
            return CommonResponses.INTERNAL_SERVER_ERROR;
        }
    }

    async delete(id: number) {
        try {
            const tag = await this.tagRepository.findOne({ where: { id } });
            if (!tag) {
                return TagResponses.TAG_NOT_FOUND;
            }

            await this.tagRepository.remove(tag);

            // Clear tags cache after deletion
            await this.cacheManager.del('tags');

            return TagResponses.TAG_DELETED;
        } catch (error) {
            return CommonResponses.INTERNAL_SERVER_ERROR;
        }
    }
}
