import { RmqModule } from '@app/common';
import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceEntity } from './entity/marketplace.entity';

@Module({
    imports:[RmqModule,TypeOrmModule.forFeature([MarketplaceEntity])]
})
export class MarketplaceModule {}