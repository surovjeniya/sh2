import { Contacts, Activity, Replytime, EducationList, CertificatesList, ProfileEntity } from "apps/profile/src/entity/profile.entity";

export namespace ProfileCreate {
  export const topic = 'profile.create.command';

  export class Request {
    firstName: string;
    lastName: string;
    description: string;
    contacts?: Contacts;
    company?: string;
    company_code?: number;
    activity: Activity;
    reply_time?: Replytime;
    portfolio_url?: string;
    education_list?: EducationList;
    certificates_list?: CertificatesList;
    location: Location;
    user_id:number
  }

  export class Response extends ProfileEntity{
   
  }
}
