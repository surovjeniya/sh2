import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegistrationDto } from '../dto/registration.dto';
import { AuthLogin, AuthRegistration } from '@app/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from '../constant/service';
import { catchError,throwError } from 'rxjs';
import { AuthConfirm } from '@app/common/contract/auth.confirm';


@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authClient
      .send<AuthLogin.Response, AuthLogin.Request>(AuthLogin.topic, dto)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  @Post('registration')
  async registration(@Body() dto: RegistrationDto) {
    return this.authClient
      .send<AuthRegistration.Response, AuthRegistration.Request>(
        AuthRegistration.topic,
        dto,
      )
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }


  @Get(':confirmation_id')
  async confirmUser(@Param('confirmation_id') confirmation_id: string){
    return this.authClient
      .send<AuthConfirm.Response, AuthConfirm.Request>(
        AuthConfirm.topic,
        {
          confirmation_id
        }
      )
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
