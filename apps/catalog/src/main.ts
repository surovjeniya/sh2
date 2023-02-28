import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';

async function bootstrap() {
  const app = await NestFactory.create(CatalogModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CATALOG'));
  await app.startAllMicroservices();
}
bootstrap();
