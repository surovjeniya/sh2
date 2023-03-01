

export namespace ProfileCreated {
  export const topic = 'profile.created.command';

  export class Request {
    user_id:number;
    profile_id:number
  }

  export class Response {}
}
