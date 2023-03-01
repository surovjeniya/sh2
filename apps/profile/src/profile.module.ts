import { DatabaseModule, RmqModule } from '@app/common';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import * as Joi from 'joi'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_SERVICE } from './constant/service';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        isGlobal:true,
        ttl:5000
      }),
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([ProfileEntity]),
    RmqModule.register({ name: USER_SERVICE }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/profile/.env',
      validationSchema: Joi.object({
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        RABBIT_MQ_PROFILE_QUEUE: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService,{
    provide:APP_INTERCEPTOR,
    useClass:CacheInterceptor
  }],
})
export class ProfileModule {}
