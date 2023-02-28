import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { ParentCategoryModule } from './parent-category/parent-category.module';
import * as Joi from 'joi'
import { SubCategoryModule } from './sub-category/sub-category.module';


@Module({
  imports: [
    SubCategoryModule,
    ParentCategoryModule,
    DatabaseModule,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/catalog/.env',
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
        RABBIT_MQ_CATALOG_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
