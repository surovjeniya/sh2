import { BaseEntity } from '@app/common';
import {Column, Entity } from 'typeorm';

export enum Activity {
  individual = 'individual',
  entity = 'entity',
}

export class Contacts {
  telegram?: string;
  viber?: string;
  whatsapp?: string;
  vk?: string;
  phone_number?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
}

export enum Replytime {
  'less-1h' = 'less-1h',
  'in-1-4h' = 'in-1-4h',
  'in-4-8h' = 'in-4-8h',
  'in-8-24h' = 'in-8-24h',
  'more-24h' = 'more-24h',
}

export class EducationList {
  university: string;
  expiration_date?: Date;
}

export class CertificatesList {
  name: string;
  expiration_date?: Date;
}

export class Location {
  country: string;
  city: string;
}

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  description: string;

  @Column({ type: 'simple-json', nullable: true })
  contacts?: Contacts;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true, type: 'bigint' })
  company_code?: number;

  @Column({ default: 0, type: 'float' })
  index_profile?: number;

  @Column({ type: 'enum', enum: Activity, default: Activity.individual })
  activity: Activity;

  @Column({ type: 'enum', enum: Replytime, default: Replytime['more-24h'] })
  reply_time?: Replytime;

  @Column({ nullable: true })
  portfolio_url?: string;

  @Column({ type: 'simple-json', nullable: true })
  education_list?: EducationList;

  @Column({ type: 'simple-json', nullable: true })
  certificates_list?: CertificatesList;

  @Column({ type: 'simple-json', nullable: true })
  location: Location;

  @Column({nullable:true,unique:true})
  user_id:number
}
