import { ProfileUpdate } from '@app/common';
import { ProfileCreate } from '@app/common/contract/profile.create.contract';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProfileEntity } from './entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async deleteProfile(id: number) {
    const profile = await this.getProfile({ id });
    try {
      return await this.profileRepository.delete({ id });
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async createProfile(dto: ProfileCreate.Request) {
    try {
      //@ts-ignore
      const profile = this.profileRepository.create({
        ...dto,
      });
      return await this.profileRepository.save(profile);
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
      return await this.profileRepository.find();
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
