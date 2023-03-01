export namespace ProfileDeleted {
  export const topic = 'profile.deleted.command';

  export class Request {
   user_id:number
  }

  export class Response {}
}
