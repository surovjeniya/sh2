import { SubCategoryEntity } from 'apps/catalog/src/sub-category/entity/sub-category.entity';


export namespace SubCategoryUpdate {
  export const topic = 'sub-category.update.command';

  export class Request {
    id: number;
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
  }

  export class Response extends SubCategoryEntity {}
}
