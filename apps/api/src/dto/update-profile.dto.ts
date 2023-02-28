import { Contacts, Activity, Replytime, EducationList, CertificatesList } from "apps/profile/src/entity/profile.entity";
import { IsString, IsNotEmpty, IsOptional, IsObject, IsNumber, IsEnum } from "class-validator";

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsObject()
  contacts?: Contacts;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsNumber()
  company_code?: number;

  @IsOptional()
  @IsEnum(Activity)
  activity?: Activity;

  @IsOptional()
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

  @IsOptional()
  @IsObject()
  location?: Location;
}