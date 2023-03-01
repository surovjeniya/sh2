import { IJwtTokenPayload } from "apps/auth/src/interface/jwt-payload.interface";
import { DeleteResult } from "typeorm";

export namespace ProfileDelete {
  export const topic = 'profile.delete.command';

  export class Request {
    id:number
    user?:IJwtTokenPayload
  }

  export class Response extends DeleteResult {}
}
