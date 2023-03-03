import { UpdateMarketplaceDto } from 'apps/api/src/dto/update-marketplace.dto';
import { MarketplaceEntity } from 'apps/catalog/src/marketplace/entity/marketplace.entity';

export namespace MarketplaceUpdate {
  export const topic = 'marketplace.update.command';

  export class Request extends UpdateMarketplaceDto{
    id:number
  }

  export class Response extends MarketplaceEntity {}
}
