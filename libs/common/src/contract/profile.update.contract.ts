import { IJwtTokenPayload } from "apps/auth/src/interface/jwt-payload.interface";
import { Contacts, Activity, Replytime, EducationList, CertificatesList, ProfileEntity } from "apps/profile/src/entity/profile.entity";

export namespace ProfileUpdate {
  export const topic = 'profile.update.command';

  export class Request {
    id: number;
    firstName?: string;
    lastName?: string;
    description?: string;
    contacts?: Contacts;
    company?: string;
    company_code?: number;
    activity?: Activity;
    reply_time?: Replytime;
    portfolio_url?: string;
    education_list?: EducationList;
    certificates_list?: CertificatesList;
    location?: Location;
  }

  export class Response extends ProfileEntity{
    
  }
}
