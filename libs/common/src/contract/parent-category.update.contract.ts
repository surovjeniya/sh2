import { ParentCategoryEntity } from 'apps/catalog/src/parent-category/entity/parent-category.entity';

export namespace ParentCategoryUpdate {
  export const topic = 'parent-category.update.command';

  export class Request {
    id:number
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
  }

  export class Response extends ParentCategoryEntity {}
}
