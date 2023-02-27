import { AuthLogin, AuthRegistration } from '@app/common';
import { AuthConfirm } from '@app/common/contract/auth.confirm';
import {Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthLogin.topic)
  async login(@Payload() dto: AuthLogin.Request) {
    const loginData:AuthLogin.Response = await this.authService.login(dto);
    return loginData;
  }

  @MessagePattern(AuthRegistration.topic)
  async registration(@Payload() dto: AuthRegistration.Request) {
    const registrationData:AuthRegistration.Response = await this.authService.registration(dto);
    return registrationData;
  }

  @MessagePattern(AuthConfirm.topic)
  async confirmUser(@Payload() dto:AuthConfirm.Request) {
    return await this.authService.confirmUser(dto.confirmation_id);
  }
}
