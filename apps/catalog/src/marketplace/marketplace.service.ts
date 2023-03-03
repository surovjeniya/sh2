import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { MarketplaceEntity } from './entity/marketplace.entity';
import { MarketplaceRepository } from './marketplace.repository';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(MarketplaceEntity)
    private readonly marketplaceRepository: MarketplaceRepository,
  ) {}

  async getMarketplace(
    params: FindOptionsWhere<MarketplaceEntity>,
  ): Promise<MarketplaceEntity> {
    const marketplace = await this.marketplaceRepository.findOne({
      where: params,
      relations: { service: true },
    });
    if (marketplace && marketplace.title) {
      return marketplace;
    } else {
      throw new RpcException(new BadRequestException('Marketplace not found'));
    }
  }

  async getMarketplaces(): Promise<MarketplaceEntity[]> {
    try {
      return await this.marketplaceRepository.find({
        relations: { service: true },
      });
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async createMarketplace(
    data: DeepPartial<MarketplaceEntity>,
  ): Promise<MarketplaceEntity> {
    try {
      const marketplace = this.marketplaceRepository.create({ ...data });
      return await this.marketplaceRepository.save(marketplace);
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async deleteMarketplace(id: number) {
    const marketplace = await this.getMarketplace({ id });
    try {
      return await this.marketplaceRepository.delete(id);
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }

  async updateMarketplace(
    id: number,
    data: QueryDeepPartialEntity<MarketplaceEntity>,
  ) {
    const marketplace = await this.getMarketplace({ id });
    await this.marketplaceRepository.update(id,data);
    return await this.getMarketplace({id})
    try {
    } catch (e) {
      throw new RpcException(new BadRequestException(e.message));
    }
  }
}
