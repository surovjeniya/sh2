import { RmqModule } from '@app/common';
import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';

@Module({
    imports:[RmqModule,TypeOrmModule.forFeature([ReviewEntity])]
})
export class ReviewModule {

}