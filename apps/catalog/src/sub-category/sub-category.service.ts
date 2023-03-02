import { ParentCategoryCreate, SubCategoryCreate } from '@app/common';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { SubCategoryEntity } from './entity/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}

  async create(payload: SubCategoryCreate.Request): Promise<SubCategoryEntity> {
    try {
      const subCategory = this.subCategoryRepository.create({
        ...payload,
        parentCategory: { id: payload.parentCategory },
      });
      return await this.subCategoryRepository.save(subCategory);
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }
  async update(
    criteria: FindOptionsWhere<SubCategoryEntity>,
    partialEntity: QueryDeepPartialEntity<SubCategoryEntity>,
  ) {
    const subCategory = await this.findOne({ id: criteria.id });
    try {
      await this.subCategoryRepository.update(criteria, partialEntity);
      return await this.findOne({ id: criteria.id });
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }
  async delete(params: FindOptionsWhere<SubCategoryEntity>) {
    const subCategory = await this.findOne({ id: params.id });
    try {
      return await this.subCategoryRepository.delete({ id: params.id });
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async findOne(
    params: FindOptionsWhere<SubCategoryEntity>,
  ): Promise<SubCategoryEntity> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: params,
      relations: {
        parentCategory: true,
      },
    });
    if (subCategory && subCategory.name) {
      return subCategory;
    } else {
      throw new RpcException(new NotFoundException('Category not found'));
    }
  }
  async find(): Promise<SubCategoryEntity[]> {
    try {
      return await this.subCategoryRepository.find({
        relations: { parentCategory: true },
      });
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }
}
