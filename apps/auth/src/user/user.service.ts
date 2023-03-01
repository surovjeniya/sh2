import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(param: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: param });
    return user
  }

  async updateUser(
    param: FindOptionsWhere<UserEntity>,
    data: QueryDeepPartialEntity<UserEntity>
  ) {
    return await this.userRepository.update(param, data);
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create({ ...dto });
      return await this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
