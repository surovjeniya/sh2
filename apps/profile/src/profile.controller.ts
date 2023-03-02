import {ProfileCreate, ProfileDelete, ProfileGetMany, ProfileGetOne, ProfileUpdate, RmqService } from '@app/common';
import { Controller, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/common/cache';
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
    private readonly rmqService: RmqService,
    private readonly profileService: ProfileService,
  ) {}

  @MessagePattern(ProfileCreate.topic)
  async createProfile(
    @Payload() payload: ProfileCreate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const profile = await this.profileService.createProfile(payload);
    this.rmqService.ack(ctx);
    return profile;
  }


  @MessagePattern(ProfileGetMany.topic)
  async getProfiles(
    @Payload() payload: ProfileGetMany.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const profiles = await this.profileService.getProfiles();
    this.rmqService.ack(ctx);
    return profiles;
  }

  @MessagePattern(ProfileGetOne.topic)
  async getProfile(
    @Payload() payload: ProfileGetOne.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const profile = await this.profileService.getProfile({ id: payload.id });
    this.rmqService.ack(ctx);
    return profile;
  }

  @MessagePattern(ProfileDelete.topic)
  async deleteProfile(
    @Payload() payload: ProfileDelete.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const deletedProfile = await this.profileService.deleteProfile(payload.id,payload.user);
    this.rmqService.ack(ctx);
    return deletedProfile;
  }

  @MessagePattern(ProfileUpdate.topic)
  async updateProfile(
    @Payload() payload: ProfileUpdate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const updatedProfile = await this.profileService.updateProfile(payload);
    this.rmqService.ack(ctx);
    return updatedProfile;
  }
}
