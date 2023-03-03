import { MarketplaceEntity } from 'apps/catalog/src/marketplace/entity/marketplace.entity';

export namespace MarketplaceGetMany {
  export const topic = 'marketplace.get-many.command';

  export class Request {
    
  }

  export class Response extends MarketplaceEntity {}
}
