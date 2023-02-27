export namespace UserGetOne {
  export const topic = 'user.get-one.command';

  export class Request {
    user_id:number
  }

  export class Response {}
}
