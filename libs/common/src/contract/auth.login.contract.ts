import { UserEntity } from "apps/auth/src/user/entity/user.entity";

export namespace AuthLogin {
    export const topic = 'auth.login.command';

    export class Request {
      email: string;
      password: string;
    }

    export class Response {
      user: UserEntity;
      accessToken:string
    }
}