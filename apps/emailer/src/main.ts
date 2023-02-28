import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { EmailerModule } from './emailer.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailerModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('EMAILER'));
  await app.startAllMicroservices();
}
bootstrap();
