import { UserEntity } from "apps/auth/src/user/entity/user.entity";

export namespace AuthRegistration {
  export const topic = 'auth.registration.command';

  export class Request {
    email: string;
    password: string;
    username: string;
    registered_from_url?: string;
  }

  export class Response {
    user: UserEntity;
    accessToken: string;
  }
}
