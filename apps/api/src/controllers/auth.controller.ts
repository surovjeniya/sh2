import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegistrationDto } from '../dto/registration.dto';
import { AuthLogin, AuthRegistration } from '@app/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from '../constant/service';
import { catchError,lastValueFrom,throwError } from 'rxjs';
import { AuthConfirm } from '@app/common/contract/auth.confirm';


@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const loginResponse =  await lastValueFrom(
      this.authClient
        .send<AuthLogin.Response,AuthLogin.Request>(AuthLogin.topic,dto)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    
    return loginResponse;
  }

  @Post('registration')
  async registration(@Body() dto: RegistrationDto) {
   const registrationResponse =  await lastValueFrom(
     this.authClient
       .send<AuthRegistration.Response,AuthRegistration.Request>(AuthRegistration.topic,dto)
       .pipe(
         catchError((error) =>
           throwError(() => new RpcException(error.response)),
         ),
       ),
   );
   return registrationResponse;
  }


  @Get(':confirmation_id')
  async confirmUser(@Param('confirmation_id') confirmation_id: string){
   const confirmationResponse =  await lastValueFrom(
     this.authClient
       .send<AuthConfirm.Response,AuthConfirm.Request>(AuthConfirm.topic,{confirmation_id})
       .pipe(
         catchError((error) =>
           throwError(() => new RpcException(error.response)),
         ),
       ),
   );
   return confirmationResponse;
  }
}
