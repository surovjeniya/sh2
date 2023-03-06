import { Injectable,BadRequestException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceEntity } from "./entity/service.entity";
import { ServiceRepository } from "./service.repository";

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async createService(data){
    try {
        const service = this.serviceRepository.create()
        return await this.serviceRepository.save(service)
    }catch(e){
        throw new RpcException(new BadRequestException(e.message));
    }
  }
}