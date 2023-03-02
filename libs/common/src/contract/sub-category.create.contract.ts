import { SubCategoryEntity } from "apps/catalog/src/sub-category/entity/sub-category.entity";

export namespace SubCategoryCreate {
  export const topic = 'sub-category.create.command';

  export class Request {
    parentCategory:number
    name: string;
    slug: string;
    description?: string;
    image?: string;
  }

  export class Response extends SubCategoryEntity {}
}
