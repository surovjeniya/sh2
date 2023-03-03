import { IsOptional, IsString } from "class-validator";

export class UpdateMarketplaceDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  marketplace_preview?: string;
}