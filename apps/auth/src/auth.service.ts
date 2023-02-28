import { AuthLogin, AuthRegistration, EmailerSendEmail, getConfirmRegistration } from '@app/common';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { compare } from 'bcrypt';
import { lastValueFrom } from 'rxjs';
import {
  EMAIL_ALREADY_USED,
  INVALID_CONFIRMATION_ID,
  INVALID_CRIDENTIALS,
  USERNAME_ALREADY_USER,
} from './constant/auth-exception.constant';
import { EMAILER_SERVICE } from './constant/service';
import { IJwtTokenPayload } from './interface/jwt-payload.interface';
import { Role, UserEntity } from './user/entity/user.entity';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService:ConfigService,
    @Inject(EMAILER_SERVICE) private readonly emailerClient:ClientProxy
  ) {}

  async generateJwtToken(user: UserEntity): Promise<string> {
    const tokenPayload: IJwtTokenPayload = {
      id: user.id,
      blocked: user.blocked,
      confirmed: user.confirmed,
      role: user.role,
      profile_id: user.profile_id ? user.profile_id : null,
    };
    return await this.jwtService.signAsync(tokenPayload);
  }

  async verifyJwtToken(token: string): Promise<IJwtTokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(dto: AuthLogin.Request) {
    const user = await this.userService.getUser({ email: dto.email });
    if (!user) {
      throw new RpcException (
         new UnauthorizedException(INVALID_CRIDENTIALS)
      )
    }
    const comparePassword = await compare(dto.password, user.password);
    if (!comparePassword) {
      throw new RpcException(new UnauthorizedException(INVALID_CRIDENTIALS));
    }
    const accessToken = await this.generateJwtToken(user);
    return {
      user,
      accessToken,
    };
  }

  async registration(dto: AuthRegistration.Request) {
    const candidate = await this.userService.getUser({ email: dto.email });
    if (candidate) {
      throw new RpcException(new BadRequestException(EMAIL_ALREADY_USED));
    } 
    const candidateUser = await this.userService.getUser({
      username: dto.username,
    });
    if (candidateUser) {
      throw new RpcException(new BadRequestException(USERNAME_ALREADY_USER));
    }
    const user = await this.userService.createUser(dto);
    await lastValueFrom(this.emailerClient.emit<EmailerSendEmail.Response,EmailerSendEmail.Request>(EmailerSendEmail.topic,{
      subject:'Подтверждение регистрации на сайте Sellershub.ru',
      html:getConfirmRegistration(this.configService.get('SERVER'),user.confirmation_id),
      text:'',
      to:user.email
    }))
    const accessToken = await this.generateJwtToken(user);
    return {
      user,
      accessToken,
    };
  }

  async confirmUser(confirmation_id:string) {
    const candidate = await this.userService.getUser({confirmation_id})
    if(!candidate) {
      throw new RpcException(new BadRequestException(INVALID_CONFIRMATION_ID));
    }
    if (candidate.confirmed) {
      return {
        message:'User already confirmed',
        accessToken:await this.generateJwtToken(candidate)
      }
    }
    await this.userService.updateUser({confirmation_id},{confirmed:true,role:Role.AUTHENTIFICATED})
    const user = await this.userService.getUser({ confirmation_id });
    return {
      message: 'Confirmation success',
      accessToken: await this.generateJwtToken(user),
    };
  }
}
