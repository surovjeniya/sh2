import { BaseEntity } from '@app/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ServiceEntity } from '../../service/entity/service.entity';

@Entity({name:'marketplace'})
export class MarketplaceEntity extends BaseEntity {
  @Column({ unique: true })
  title: string;
  @Column()
  description: string;
  //   image: string;
  //   marketplace_preview:string

  @ManyToOne(() => ServiceEntity,service => service.marketplaces)
  @JoinColumn({name:'service_id'})
  service:ServiceEntity
}
