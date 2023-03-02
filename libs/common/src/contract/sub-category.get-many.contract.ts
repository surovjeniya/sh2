import { SubCategoryEntity } from 'apps/catalog/src/sub-category/entity/sub-category.entity';

export namespace SubCategoryGetMany {
  export const topic = 'sub-category.get-many.command';

  export class Request {
    
  }

  export class Response extends SubCategoryEntity {}
}
