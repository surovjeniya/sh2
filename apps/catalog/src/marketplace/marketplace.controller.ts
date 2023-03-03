import {
  MarketplaceCreate,
  MarketplaceGetMany,
  MarketplaceGetOne,
  RmqService,
  MarketplaceDelete,
  MarketplaceUpdate,
} from '@app/common';
import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { MarketplaceService } from "./marketplace.service";

@Controller()
export class MarketplaceController {
  constructor(
    private readonly marketplaceService: MarketplaceService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern(MarketplaceCreate.topic)
  async createMarketplace(
    @Payload() payload: MarketplaceCreate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const marketplace = await this.marketplaceService.createMarketplace({
      ...payload,
    });
    this.rmqService.ack(ctx);
    return marketplace;
  }

  @MessagePattern(MarketplaceGetMany.topic)
  async findMarketplaces(
    @Payload() payload: MarketplaceGetMany.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const marketplaces = await this.marketplaceService.getMarketplaces();
    this.rmqService.ack(ctx);
    return marketplaces;
  }

  @MessagePattern(MarketplaceGetOne.topic)
  async findMarketplace(
    @Payload() payload: MarketplaceGetOne.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const marketplace = await this.marketplaceService.getMarketplace({
      id: payload.id,
    });
    this.rmqService.ack(ctx);
    return marketplace;
  }

  @MessagePattern(MarketplaceDelete.topic)
  async deleteMarketplace(
    @Payload() payload: MarketplaceDelete.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const marketplace = await this.marketplaceService.deleteMarketplace(
      payload.id,
    );
    this.rmqService.ack(ctx);
    return marketplace;
  }

  @MessagePattern(MarketplaceUpdate.topic)
  async updateMarketplace(
    @Payload() payload: MarketplaceUpdate.Request,
    @Ctx() ctx: RmqContext,
  ) {
    const marketplace = await this.marketplaceService.updateMarketplace(payload.id,{...payload})
    this.rmqService.ack(ctx);
    return marketplace;
  }
}