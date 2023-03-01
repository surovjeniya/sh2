import {
  ProfileCreated,
  ProfileDeleted,
  RmqService,
  UserGetOne,
  UserUpdate,
} from '@app/common';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(UserGetOne.topic)
  async getUserById(
    @Payload() payload: UserGetOne.Request,
    @Ctx() ctx: RmqContext,
  ) {
    this.rmqService.ack(ctx);
    return await this.userService.getUser({ id: payload.user_id });
  }

  @MessagePattern(UserUpdate.topic)
  async updateUser(
    @Payload() payload: UserUpdate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    this.rmqService.ack(ctx);
    return await this.userService.updateUser(payload.param, payload.data);
  }

  @EventPattern(ProfileCreated.topic)
  async profileCreated(
    @Payload() payload: ProfileCreated.Request,
    @Ctx() ctx: RmqContext,
  ) {
    this.rmqService.ack(ctx);
    return await this.userService.updateUser(
      { id: payload.user_id },
      { profile_id: payload.profile_id },
    );
  }

  @EventPattern(ProfileDeleted.topic)
  async profileDeleted(
    @Payload() payload: ProfileDeleted.Request,
    @Ctx() ctx: RmqContext,
  ) {
    this.rmqService.ack(ctx)
    return await this.userService.updateUser({id:payload.user_id},{profile_id:null})
  }
}
