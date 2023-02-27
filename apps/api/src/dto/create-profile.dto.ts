import {
  Activity,
  CertificatesList,
  Contacts,
  EducationList,
  Replytime,
} from 'apps/profile/src/entity/profile.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsObject()
  contacts?: Contacts;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsNumber()
  company_code?: number;

  @IsEnum(Activity)
  activity: Activity;

  @IsEnum(Replytime)
  reply_time?: Replytime;

  @IsString()
  @IsOptional()
  portfolio_url?: string;

  @IsOptional()
  @IsObject()
  education_list?: EducationList;

  @IsOptional()
  @IsObject()
  certificates_list?: CertificatesList;

  @IsNotEmpty()
  @IsObject()
  location: Location;
}
