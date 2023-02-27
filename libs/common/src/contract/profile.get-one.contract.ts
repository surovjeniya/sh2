import { ProfileEntity } from "apps/profile/src/entity/profile.entity";

export namespace ProfileGetOne {
  export const topic = 'profile.get-one.command';

  export class Request {
    id:number
  }

  export class Response extends ProfileEntity{

  }
}
