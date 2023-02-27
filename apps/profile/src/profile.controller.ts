import {ProfileCreate, ProfileGetOne, RmqService } from '@app/common';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(
    private readonly rmqService:RmqService,
    private readonly profileService: ProfileService,
  ) {}

  @MessagePattern(ProfileCreate.topic)
  async createProfile(
    @Payload() payload: ProfileCreate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    this.rmqService.ack(ctx)
    return await this.profileService.createProfile(payload);
  }

  @MessagePattern(ProfileGetOne.topic)
  async getProfile(@Payload() payload: ProfileGetOne.Request,@Ctx() ctx:RmqContext) {
    const profile = await this.profileService.getProfile({id:payload.id})
    this.rmqService.ack(ctx)
    return profile
  }
}
