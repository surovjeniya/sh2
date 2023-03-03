import { GenericRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ServiceEntity } from './entity/service.entity';

@Injectable()
export class ServiceRepository extends GenericRepository<ServiceEntity> {
  constructor(dataSource: DataSource) {
    super(ServiceEntity, dataSource);
  }
}
