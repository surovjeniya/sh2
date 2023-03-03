import { DeleteResult } from "typeorm";

export namespace MarketplaceDelete {
  export const topic = 'marketplace.delete.command';

  export class Request {
    id:number
  }

  export class Response extends DeleteResult {}
}
