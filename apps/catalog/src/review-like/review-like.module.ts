import { RmqModule } from '@app/common';
import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewLikeEntity } from './entity/review-like.entity';

@Module({
    imports:[RmqModule,TypeOrmModule.forFeature([ReviewLikeEntity])]
})
export class ReviewLikeModule{}