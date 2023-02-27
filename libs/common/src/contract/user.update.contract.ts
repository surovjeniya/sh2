import { UserEntity } from "apps/auth/src/user/entity/user.entity";
import { FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export namespace UserUpdate {
  export const topic = 'user.update.command';

  export class Request {
    param: FindOptionsWhere<UserEntity>
    data: QueryDeepPartialEntity<UserEntity>
  }

  export class Response {}
}
