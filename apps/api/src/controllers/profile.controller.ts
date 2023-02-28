import {
  ProfileGetOne,
  ProfileCreate,
  ProfileDelete,
  ProfileUpdate,
  ProfileGetMany,
} from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CurrentUser } from 'apps/auth/src/decorator/current-user.decorator';
import { IJwtTokenPayload } from 'apps/auth/src/interface/jwt-payload.interface';
import { catchError, throwError, lastValueFrom } from 'rxjs';
import { PROFILE_SERVICE } from '../constant/service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import JwtAuthGuard from '../guard/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(PROFILE_SERVICE) private readonly profileClient: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProfile(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    const profileUpdateResponse = await lastValueFrom(
      this.profileClient
        .send<ProfileUpdate.Response, ProfileUpdate.Request>(
          ProfileUpdate.topic,
          { id, ...dto },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return profileUpdateResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProfile(@Param('id', new ParseIntPipe()) id: number) {
    const profileDeleteResponse = await lastValueFrom(
      this.profileClient
        .send<ProfileDelete.Response, ProfileDelete.Request>(
          ProfileDelete.topic,
          { id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return profileDeleteResponse;
  }

  @Get()
  async getProfiles() {
    const getManyProfilesResponse = await lastValueFrom(
      this.profileClient
        .send<ProfileGetMany.Response[], ProfileGetMany.Request>(
          ProfileGetMany.topic,
          {},
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return getManyProfilesResponse;
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    const getOneProfileResponse = await lastValueFrom(
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
    return getOneProfileResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(
    @Body() dto: CreateProfileDto,
    @CurrentUser() user: IJwtTokenPayload,
  ) {
    const createProfileResponse = await lastValueFrom(
      this.profileClient
        .send<ProfileCreate.Response, ProfileCreate.Request>(
          ProfileCreate.topic,
          { ...dto, user_id: user.id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return createProfileResponse;
  }
}
