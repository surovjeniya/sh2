import { DeleteResult } from 'typeorm';

export namespace ParrentCategoryDelete {
  export const topic = 'parent-category.get-many.command';

  export class Request {
    id:number
    slug?:number
  }

  export class Response extends DeleteResult {}
}
