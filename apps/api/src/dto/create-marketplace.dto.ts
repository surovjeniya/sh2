import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMarketplaceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  marketplace_preview?: string;
}