import { ParentCategoryEntity } from 'apps/catalog/src/parent-category/entity/parent-category.entity';

export namespace ParrentCategoryGetMany {
  export const topic = 'parent-category.get-many.command';

  export class Request {
    
  }

  export class Response extends ParentCategoryEntity {}
}
