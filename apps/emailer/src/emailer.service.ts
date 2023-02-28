import { EmailerSendEmail } from '@app/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class EmailerService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(payload: EmailerSendEmail.Request): Promise<SentMessageInfo> {
    try {
      const email = await this.mailerService.sendMail({
        ...payload,
      });
      return email;
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }
}
