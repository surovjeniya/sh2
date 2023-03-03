import { RmqModule } from '@app/common';
import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceEntity } from './entity/marketplace.entity';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceRepository } from './marketplace.repository';
import { MarketplaceService } from './marketplace.service';

@Module({
  imports: [RmqModule, TypeOrmModule.forFeature([MarketplaceEntity])],
  providers: [MarketplaceRepository, MarketplaceService],
  controllers:[MarketplaceController]
})
export class MarketplaceModule {}