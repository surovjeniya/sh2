import { ParentCategoryEntity } from "apps/catalog/src/parent-category/entity/parent-category.entity";

export namespace ParentCategoryGetOne {
  export const topic = 'parent-category.get-one.command';

  export class Request {
    id:number
    slug?:string
  }

  export class Response extends ParentCategoryEntity{}
}
