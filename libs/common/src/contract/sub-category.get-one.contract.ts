import { SubCategoryEntity } from 'apps/catalog/src/sub-category/entity/sub-category.entity';

export namespace SubCategoryGetOne {
  export const topic = 'sub-category.get-one.command';

  export class Request {
    id:number
  }

  export class Response extends SubCategoryEntity {}
}
