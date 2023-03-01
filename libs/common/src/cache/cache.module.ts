import { CacheModule } from "@nestjs/common";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async () => ({
        isGlobal: true,
      }),
    }),
  ],
  exports: [],
})
export class CacheeModule {}