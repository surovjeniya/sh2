import { ApiProperty } from '@nestjs/swagger';

export class UploadImageResponse {
  @ApiProperty()
  originalname: string;
  @ApiProperty()
  filename: string;
}
