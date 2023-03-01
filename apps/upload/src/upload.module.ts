import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import * as Joi from 'joi'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    RmqModule,
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get('UPLOAD_FILES_FOLDER'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/profile/.env',
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        RABBIT_MQ_PROFILE_QUEUE: Joi.string().required(),
        RABBIT_MQ_CATALOG_QUEUE: Joi.string().required(),
        RABBIT_MQ_EMAILER_QUEUE: Joi.string().required(),
        RABBIT_MQ_UPLOAD_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
