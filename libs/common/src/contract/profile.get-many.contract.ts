import { ProfileEntity } from 'apps/profile/src/entity/profile.entity';

export namespace ProfileGetMany {
  export const topic = 'profile.get-many.command';

  export class Request {
    
  }

  export class Response extends ProfileEntity {}
}
