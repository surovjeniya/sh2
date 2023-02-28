import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const getMailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  defaults: {
    from: configService.get('SMTP_EMAIL_DEF_FROM'),
    replyTo: configService.get('SMTP_EMAIL_DEF_REPLY_TO'),
  },
  preview:true,
  transport: {
    host: configService.get('SMTP_HOST'),
    port: configService.get('SMTP_PORT'),
    auth: {
      user: configService.get('SMTP_EMAIL_ADDRESS'),
      pass: configService.get('SMTP_EMAIL_PASSWORD'),
    },
  },
});
