import { RmqModule } from '@app/common';
import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewAnswerEntity } from './entity/review-answer.entity';

@Module({
    imports:[RmqModule,TypeOrmModule.forFeature([ReviewAnswerEntity])]
})
export class ReviewAnswerModule {}