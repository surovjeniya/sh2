import { ParentCategoryEntity } from 'apps/catalog/src/parent-category/entity/parent-category.entity';

export namespace ParentCategoryCreate {
  export const topic = 'parent-category.create.command';

  export class Request {
    name: string;
    slug: string;
    description?: string;
    image?: string;
  }

  export class Response extends ParentCategoryEntity {}
}
