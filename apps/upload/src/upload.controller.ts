import { RmqService, UploadImage } from '@app/common';
import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(UploadImage.topic)
  async uploadImage(
    @Payload() payload: UploadImage.Request,
    @Ctx() ctx: RmqContext,
  ) {
    this.rmqService.ack(ctx);
    console.log(payload.image);
  }
}
