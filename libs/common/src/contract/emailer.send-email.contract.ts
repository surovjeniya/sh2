export namespace EmailerSendEmail {
  export const topic = 'emailer.send-email.command';

  export class Request {
    to: string;
    subject: string;
    text: string;
    html: string;
  }

  export class Response {}
}
