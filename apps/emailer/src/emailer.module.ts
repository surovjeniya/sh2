import { RmqModule } from '@app/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { getMailerConfig } from './config/mailer.config';
import { EmailerController } from './emailer.controller';
import { EmailerService } from './emailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/emailer/.env',
      validationSchema: Joi.object({
        SMTP_EMAIL_ADDRESS: Joi.string().required(),
        SMTP_EMAIL_PASSWORD: Joi.string().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().required(),
        SMTP_EMAIL_DEF_FROM: Joi.string().required(),
        SMTP_EMAIL_DEF_REPLY_TO: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_EMAILER_QUEUE: Joi.string().required(),
        RABBIT_MQ_PROFILE_QUEUE: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
        RABBIT_MQ_CATALOG_QUEUE: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        SERVER: Joi.string().required(),
      }),
    }),
    RmqModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await getMailerConfig(configService),
    }),
  ],
  controllers: [EmailerController],
  providers: [EmailerService],
})
export class EmailerModule {}
