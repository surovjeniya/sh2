import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './entity/tag.entity';

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagEntity) private readonly tagRepository:Repository<TagEntity>){}
}