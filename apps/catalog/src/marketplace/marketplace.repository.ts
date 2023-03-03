import { GenericRepository } from "@app/common";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { MarketplaceEntity } from "./entity/marketplace.entity";

@Injectable()
export class MarketplaceRepository extends GenericRepository<MarketplaceEntity> {
  constructor(dataSource: DataSource) {
    super(MarketplaceEntity, dataSource);
  }
}