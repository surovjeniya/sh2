import { ServiceEntity } from 'apps/catalog/src/service/entity/service.entity';

export namespace ServiceCreate {
  export const topic = 'service.create.command';

  export class Request {
    
  }

  export class Response extends ServiceEntity {}
}
