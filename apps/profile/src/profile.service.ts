import { ProfileCreated, ProfileDeleted, ProfileUpdate } from '@app/common';
import { ProfileCreate } from '@app/common/contract/profile.create.contract';
import {
  BadRequestException,
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtTokenPayload } from 'apps/auth/src/interface/jwt-payload.interface';
import { lastValueFrom } from 'rxjs';
import { FindOptionsWhere, Repository } from 'typeorm';
import { USER_SERVICE } from './constant/service';
import { ProfileEntity } from './entity/profile.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @Inject(USER_SERVICE) private readonly userClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async deleteProfile(id: number, user?: IJwtTokenPayload) {
    const profile = await this.getProfile({ id });
    if (profile.id !== user.profile_id)
      throw new RpcException(new ForbiddenException('Its not yours profile.'));
    try {
      const deletedProfile = await this.profileRepository.delete({ id });
      await lastValueFrom(
        this.userClient.emit<ProfileDeleted.Response, ProfileDeleted.Request>(
          ProfileDeleted.topic,
          { user_id: user.id },
        ),
      );
      return deletedProfile;
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async createProfile(dto: ProfileCreate.Request): Promise<ProfileEntity> {
    try {
      //@ts-ignore
      const profile: ProfileEntity = this.profileRepository.create({
        ...dto,
      });
      const createdProfile = await this.profileRepository.save(profile);
      await lastValueFrom(
        this.userClient.send<ProfileCreated.Response, ProfileCreated.Request>(
          ProfileCreated.topic,
          {
            profile_id: createdProfile.id,
            user_id: profile.user_id,
          },
        ),
      );
      return createdProfile;
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async getProfile(param: FindOptionsWhere<ProfileEntity>) {
    const profile = await this.profileRepository.findOne({ where: param });
    if (profile && profile.firstName) {
      return profile;
    } else {
      throw new RpcException(new NotFoundException(`Profile  not found`));
    }
  }

  async getProfiles(): Promise<ProfileEntity[]> {
    try {
      const profilesFromCache:ProfileEntity[] = await this.cacheService.store.get('profiles')
      if(profilesFromCache) {
        return profilesFromCache;
      }else {
        const profiles = await this.profileRepository.find();
        await this.cacheService.store.set('profiles', profiles);
        return profiles
      }
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async updateProfile(dto: ProfileUpdate.Request) {
    const profile = await this.getProfile({ id: dto.id });
    try {
      //@ts-ignore
      await this.profileRepository.update(profile.id, { ...dto });
      return await this.getProfile({ id: dto.id });
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }
}
