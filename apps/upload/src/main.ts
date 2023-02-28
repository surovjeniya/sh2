import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { UploadModule } from './upload.module';

async function bootstrap() {
  const app = await NestFactory.create(UploadModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('UPLOAD'));
  await app.startAllMicroservices();
}
bootstrap();
