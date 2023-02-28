import { EmailerSendEmail, RmqService } from '@app/common';
import { Controller} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailerService } from './emailer.service';

@Controller()
export class EmailerController {
  constructor(
    private readonly emailerService: EmailerService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(EmailerSendEmail.topic)
  async sendEmail(@Payload() payload:EmailerSendEmail.Request,@Ctx() ctx:RmqContext){
    const sendedEmail = await this.emailerService.sendEmail(payload)
    this.rmqService.ack(ctx)
    return sendedEmail
  }
}
