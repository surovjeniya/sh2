import { ProfileGetOne, UserGetOne, UserUpdate,ProfileCreate,ProfileDelete,ProfileUpdate } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CurrentUser } from 'apps/auth/src/decorator/current-user.decorator';
import { IJwtTokenPayload } from 'apps/auth/src/interface/jwt-payload.interface';
import { catchError, throwError ,lastValueFrom} from 'rxjs';
import { PROFILE_SERVICE, USER_SERVICE } from '../constant/service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import JwtAuthGuard from '../guard/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(PROFILE_SERVICE) private readonly profileClient: ClientProxy,
    @Inject(USER_SERVICE) private readonly userClient: ClientProxy,
  ) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    const profile = await lastValueFrom(
      this.profileClient
        .send<ProfileGetOne.Response, ProfileGetOne.Request>(
          ProfileGetOne.topic,
          { id: Number(id) },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    const user = await lastValueFrom(this.userClient.send<UserGetOne.Response,UserGetOne.Request>(UserGetOne.topic,{user_id:profile.user_id}).pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      ))
    return {
      profile,user
    }
    
  }

  @UseGuards()
  @Delete(':id')
  async deleteProfile(@Param('id') id:string){
    const deletedProfile = await lastValueFrom(
      this.profileClient
        .send<ProfileDelete.Response, ProfileDelete.Request>(
          ProfileDelete.topic,
          { id: Number(id) },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return deletedProfile
  }

  @UseGuards()
  @Put(':id')
  async updateProfile(@Param('id') id:string,@Body() dto:UpdateProfileDto){
    const updatedProfile = await lastValueFrom(
      this.profileClient
        .send<ProfileUpdate.Response, ProfileUpdate.Request>(
          ProfileUpdate.topic,
          {
            id,
            dto,
          },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return updatedProfile
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(
    @Body() dto: CreateProfileDto,
    @CurrentUser() {confirmed,id}: IJwtTokenPayload,
  ) {
    if (!confirmed) {
      throw new UnauthorizedException('User dont confirmed');
    }
    const req: ProfileCreate.Request = {
      ...dto,
      user_id:id,
    };
    const profile =  await lastValueFrom(this.profileClient
      .send<ProfileCreate.Response, ProfileCreate.Request>(
        ProfileCreate.topic,
        req,
      )
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      ))
    const updateProfileIdInUser = await lastValueFrom(
      this.userClient.send<any,UserUpdate.Request>(UserUpdate.topic,{param:{id},data:{profile_id:profile.id}})
    )
    const user = await lastValueFrom(
      this.userClient
        .send<UserGetOne.Response, UserGetOne.Request>(UserGetOne.topic, {
          user_id: profile.user_id,
        })
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return {
      profile,user
    }
  }
}
