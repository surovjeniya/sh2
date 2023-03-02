import { ParentCategoryCreate, ParentCategoryGetOne, RmqService,ParrentCategoryGetMany, ParrentCategoryDelete, ParentCategoryUpdate } from "@app/common";
import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { ParentCategoryService } from "./parent-category.service";

@Controller()
export class ParrentCategoryController {
  constructor(
    private readonly parentCategoryService: ParentCategoryService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(ParentCategoryGetOne.topic)
  async getParentCategory(
    @Payload() payload: ParentCategoryGetOne.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const parentCategory = await this.parentCategoryService.getParentCategory({
      id: payload.id,
    });
    this.rmqService.ack(ctx);
    return parentCategory;
  }

  @MessagePattern(ParentCategoryCreate.topic)
  async createParentCategory(
    @Payload() payload: ParentCategoryCreate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const parentCategory =
      await this.parentCategoryService.createParentCategory(payload);
    this.rmqService.ack(ctx);
    return parentCategory;
  }

  @MessagePattern(ParrentCategoryGetMany.topic)
  async getParentCategories(
    @Payload() payload: ParrentCategoryGetMany.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const parentCategories =
      await this.parentCategoryService.getParentCategories(payload);
    this.rmqService.ack(ctx);
    return parentCategories;
  }

  @MessagePattern(ParrentCategoryDelete.topic)
  async deleteParentCategory(
    @Payload() payload: ParrentCategoryDelete.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const deletedParentCategory = await this.parentCategoryService.deleteParentCategory(payload.id)
    this.rmqService.ack(ctx);
    return deletedParentCategory;
  }

  @MessagePattern(ParentCategoryUpdate.topic)
  async updateProfile(@Payload() payload:ParentCategoryUpdate.Request,@Ctx() ctx:RmqContext){
    const updatedParentCategory = await this.parentCategoryService.updateParentCategory({id:payload.id},{...payload})
    this.rmqService.ack(ctx)
    return updatedParentCategory
  }
}