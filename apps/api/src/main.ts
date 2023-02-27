import {ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { RpcExceptionFilter } from './utils/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcExceptionFilter());
  const configService = app.get(ConfigService);
  app.startAllMicroservices()
  await app.listen(configService.get('PORT'));
}
bootstrap();
