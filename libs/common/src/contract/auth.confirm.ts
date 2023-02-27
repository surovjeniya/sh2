export namespace AuthConfirm {
  export const topic = 'auth.confirm.command';

  export class Request {
    confirmation_id:string
  }

  export class Response {
    message: string;
    accessToken:string
  }
}
