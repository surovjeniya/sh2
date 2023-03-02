import { RmqModule } from '@app/common';
import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entity/tag.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
    imports:[RmqModule,TypeOrmModule.forFeature([TagEntity])],
    controllers:[TagController],
    providers:[TagService]
})
export class TagModule {}