import { DeleteResult } from "typeorm";

export namespace ProfileDelete {
  export const topic = 'profile.delete.command';

  export class Request {
    id:number
  }

  export class Response extends DeleteResult {}
}
