import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { getJwtConfig } from './config/jwt.config';
import {
  AUTH_SERVICE,
  CATALOG_SERVICE,
  PROFILE_SERVICE,
  UPLOAD_SERVICE,
  USER_SERVICE,
} from './constant/service';
import { AuthController } from './controllers/auth.controller';
import {ParentCategoryController } from './controllers/parent-category.controller';
import { ProfileController } from './controllers/profile.controller';
import { SubCategoryController } from './controllers/sub-category-controller';
import { UploadController } from './controllers/upload.controller';
import { UserController } from './controllers/user.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    RmqModule.register({ name: AUTH_SERVICE }),
    RmqModule.register({ name: PROFILE_SERVICE }),
    RmqModule.register({ name: USER_SERVICE }),
    RmqModule.register({ name: CATALOG_SERVICE }),
    RmqModule.register({ name: UPLOAD_SERVICE }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await getJwtConfig(configService),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api/.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        RABBIT_MQ_PROFILE_QUEUE: Joi.string().required(),
        RABBIT_MQ_CATALOG_QUEUE: Joi.string().required(),
        RABBIT_MQ_USER_QUEUE: Joi.string().required(),
        RABBIT_MQ_UPLOAD_QUEUE: Joi.string().required(),
        SERVER: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [
    AuthController,
    ProfileController,
    ParentCategoryController,
    UploadController,
    UserController,
    SubCategoryController,
  ],
  providers: [JwtStrategy],
})
export class ApiModule {}
