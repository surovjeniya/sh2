import { MarketplaceEntity } from "apps/catalog/src/marketplace/entity/marketplace.entity";

export namespace MarketplaceCreate {
  export const topic = 'marketplace.create.command';

  export class Request {
    title: string;
    description: string;
    image?: string;
    marketplace_preview?: string;
  }

  export class Response extends MarketplaceEntity  {}
}
