import { MarketplaceEntity } from 'apps/catalog/src/marketplace/entity/marketplace.entity';

export namespace MarketplaceGetOne {
  export const topic = 'marketplace.get-one.command';

  export class Request {
    id:number
  }

  export class Response extends MarketplaceEntity {}
}
