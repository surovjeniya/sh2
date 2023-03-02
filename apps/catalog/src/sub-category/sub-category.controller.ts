import { RmqService, SubCategoryCreate, SubCategoryDelete, SubCategoryGetMany, SubCategoryGetOne, SubCategoryUpdate } from '@app/common';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SubCategoryService } from './sub-category.service';

@Controller()
export class SubCategoryController {
  constructor(
    private readonly subCategoryService: SubCategoryService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(SubCategoryCreate.topic)
  async createSubCategory(
    @Payload() payload: SubCategoryCreate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const subCategory = await this.subCategoryService.create(payload);
    this.rmqService.ack(ctx);
    return subCategory;
  }

  @MessagePattern(SubCategoryGetOne.topic)
  async getSubCategory(
    @Payload() payload: SubCategoryGetOne.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const subCategory = await this.subCategoryService.findOne({
      id: payload.id,
    });
    this.rmqService.ack(ctx);
    return subCategory;
  }

  @MessagePattern(SubCategoryGetMany.topic)
  async getSubCategories(
    @Payload() payload: SubCategoryGetMany.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const subCategories = await this.subCategoryService.find();
    this.rmqService.ack(ctx);
    return subCategories;
  }

  @MessagePattern(SubCategoryDelete.topic)
  async deleteSubCategory(
    @Payload() payload: SubCategoryDelete.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const deletedSubCategory = await this.subCategoryService.delete({
      id: payload.id,
    });
    this.rmqService.ack(ctx);
    return deletedSubCategory;
  }

  @MessagePattern(SubCategoryUpdate.topic)
  async updateSubCategory(@Payload() payload: SubCategoryUpdate.Request,@Ctx() ctx:RmqContext) {
    console.log(payload)
    const updatedSubCategory = await this.subCategoryService.update({id:payload.id},{...payload})
    this.rmqService.ack(ctx)
    return updatedSubCategory
  }
}
