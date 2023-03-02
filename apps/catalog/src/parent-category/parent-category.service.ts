import { ParentCategoryCreate, ParrentCategoryGetMany } from '@app/common';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ParentCategoryEntity } from './entity/parent-category.entity';

@Injectable()
export class ParentCategoryService {
  constructor(
    @InjectRepository(ParentCategoryEntity)
    private readonly parentCategoryRepository: Repository<ParentCategoryEntity>,
  ) {}

  async getParentCategory(
    params: FindOptionsWhere<ParentCategoryEntity>,
  ): Promise<ParentCategoryEntity> {
    const parentCategory = await this.parentCategoryRepository.findOne({
      where: params,
      relations: { subCategories: true },
    });
    if (parentCategory && parentCategory.name) {
      return parentCategory;
    } else {
      throw new RpcException(new NotFoundException('Category not found'));
    }
  }

  async createParentCategory(
    dto: ParentCategoryCreate.Request,
  ): Promise<ParentCategoryEntity> {
    try {
      const parentCategory = this.parentCategoryRepository.create({ ...dto });
      return await this.parentCategoryRepository.save(parentCategory);
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async getParentCategories(payload: ParrentCategoryGetMany.Request) {
    try {
      const parrentCategories = await this.parentCategoryRepository.find({
        relations: { subCategories: true },
      })
      return parrentCategories;
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async deleteParentCategory(id: number):Promise<DeleteResult> {
    const category = await this.getParentCategory({ id });
    try {
      return await this.parentCategoryRepository.delete({id});
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async updateParentCategory(criteria:FindOptionsWhere<ParentCategoryEntity>,partialEntity: QueryDeepPartialEntity<ParentCategoryEntity>){
    const category = await this.getParentCategory({id:criteria.id})
    try {
       await this.parentCategoryRepository.update(
        criteria,
        partialEntity,
      );
      return await this.getParentCategory({ id: criteria.id });
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }
}
