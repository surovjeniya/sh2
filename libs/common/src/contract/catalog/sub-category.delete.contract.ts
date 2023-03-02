import { DeleteResult } from 'typeorm';

export namespace SubCategoryDelete {
  export const topic = 'sub-category.delete.command';

  export class Request {
    id:number
  }

  export class Response extends DeleteResult {}
}
