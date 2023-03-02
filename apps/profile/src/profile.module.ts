import { DatabaseModule, RmqModule } from '@app/common';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_SERVICE } from './constant/service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore.redisStore.name,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 100000,
        // username: configService.get('REDIS_USERNAME') || '',
        // password: configService.get('REDIS_PASSWORD') || '',
        // no_ready_check: true,
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
        POSTGRES_DB: Joi.string().required(),
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
  providers: [ProfileService],
})
export class ProfileModule {}
