import { BaseEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { MarketplaceEntity } from '../../marketplace/entity/marketplace.entity';
import { ReviewEntity } from '../../review/entity/review.entity';
import { TagEntity } from '../../tag/entity/tag.entity';
import { EyesColorEnum } from './enum/eyes-color.enum';
import { HairsColorEnum } from './enum/hairs-color.enum';
import { LearningFormatEnum } from './enum/learning-format.enum';
import { OneUnitOfWorkEnum } from './enum/one-unit-of-work.enum';
import { IAdditionalServices } from './interface/additional-services.interface';
import { IAdditionalTools } from './interface/additional-tools.interface';
import { IAdvantages } from './interface/advantages.interface';
import { IAppList } from './interface/app-list.interface';
import { ICollaborationType } from './interface/collaboration-type.interface';
import { ICounter } from './interface/counter.interface';
import { ICourseDuration } from './interface/course-duration.interface';
import { ICourseLink } from './interface/course-link.interface';
import { IDeliveryPeriod } from './interface/delivery-period.interface';
import { IDeliveryRegion } from './interface/delivery-region.interface';
import { IDiscount } from './interface/discount.interface';
import { IFeatures } from './interface/features.interface';
import { IMinimumVolume } from './interface/minimum-volume.interface';
import { IModelCharacterictics } from './interface/model-characteristics.interface';
import { IPriceInfo } from './interface/price-info.interface';
import { IProductCategory } from './interface/product-category.interface';
import { IRegion } from './interface/region.interface';
import { IRequest } from './interface/request.interface';
import { IServices } from './interface/services.interface';
import { IStockRegion } from './interface/stock-region.interface';
import { ISupply } from './interface/supply.interface';
import { ITakenRegion } from './interface/taken-region.interface';
import { ITariffAnalytics } from './interface/tariff-analytics.interface';
import { ITariff } from './interface/tariff.interface';
import { IVideos } from './interface/videos.interface';

@Entity({ name: 'service' })
export class ServiceEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  reply_time: string;

  @Column()
  start_in_days: number;

  @Column()
  price: number;

  @Column({ type: 'simple-json', nullable: true })
  price_info: IPriceInfo;

  @Column({ type: 'simple-json', nullable: true })
  advantages: IAdvantages;

  @Column({ type: 'simple-json', nullable: true })
  fetures: IFeatures;

  @Column({ type: 'simple-json', nullable: true })
  tariff_analytics: ITariffAnalytics;

  @Column({ type: 'simple-json', nullable: true })
  videos: IVideos;

  @Column()
  placed_at: Date;

  @Column()
  sub_category_id: number;

  // @Column()
  // previews: any; // media multi images and video

  @Column()
  text: string;

  @Column({ type: 'int' })
  pin_position: number; 

  @Column()
  pin_attachment_start_at: Date;

  @Column()
  pin_attachment_finish_at: Date;

  @Column()
  pin_select: boolean;

  @Column()
  pin_select_start_at: Date;

  @Column()
  pin_select_finish_at: Date;

  @Column({ type: 'text' })
  description: string; 

  @Column({ type: 'simple-json', nullable: true })
  region: IRegion;

  @Column({ type: 'simple-json', nullable: true })
  supply: ISupply;

  @Column()
  credit: string;

  @Column({ type: 'simple-json', nullable: true })
  discount: IDiscount;

  @Column()
  demo: string;

  @Column({ type: 'simple-json', nullable: true })
  app_list: IAppList;

  // @Column()
  // image: string; // single image only images

  // @Column()
  // cases: any; // media multi all formats

  // @Column()
  // price_file: any; // media multi all formats

  @Column()
  portfolio_url: string;

  @Column()
  experience: string;

  @Column({ type: 'simple-json', nullable: true })
  course_duration: ICourseDuration;

  @Column({ type: 'simple-json', nullable: true })
  course_link: ICourseLink;

  @Column({
    type: 'enum',
    enum: LearningFormatEnum,
    nullable: true,
  })
  learning_format: LearningFormatEnum;

  @Column()
  users_count: string;

  @Column()
  collection_period: string;

  @Column({ type: 'simple-json', nullable: true })
  additional_tools: IAdditionalTools;

  @Column({
    type: 'enum',
    enum: HairsColorEnum,
    nullable: true,
  })
  hairs_color: HairsColorEnum;

  @Column({
    type: 'enum',
    enum: HairsColorEnum,
    nullable: true,
  })
  eyes_color: EyesColorEnum;

  @Column({ type: 'simple-json', nullable: true })
  model_characteristics: IModelCharacterictics;

  @Column({
    type: 'enum',
    enum: HairsColorEnum,
    nullable: true,
  })
  one_unit_of_work: OneUnitOfWorkEnum;

  @Column({ type: 'float' })
  index_service: number; 

  @Column({ type: 'simple-json', nullable: true })
  counter: ICounter; // json

  @Column({ type: 'simple-json', nullable: true })
  minimum_volume: IMinimumVolume;

  @Column({ type: 'simple-json', nullable: true })
  product_category: IProductCategory;

  @Column()
  trial_period: boolean;

  @Column()
  catalog_url: string;

  @Column()
  stm: boolean;

  @Column()
  trial_lesson: boolean;

  @Column()
  installment: boolean;

  @Column({ type: 'simple-json', nullable: true })
  tariff: ITariff;

  @Column({ type: 'simple-json', nullable: true })
  additional_services: IAdditionalServices;

  @Column({ type: 'simple-json', nullable: true })
  request: IRequest;

  @Column({ type: 'simple-json', nullable: true })
  services: IServices;

  @Column({ type: 'simple-json', nullable: true })
  collaboration_type: ICollaborationType;

  @Column({ type: 'simple-json', nullable: true })
  delivery_region: IDeliveryRegion;

  @Column({ type: 'simple-json', nullable: true })
  stock_region: IStockRegion;

  @Column({ type: 'simple-json', nullable: true })
  taken_region: ITakenRegion;

  @Column({ type: 'decimal' })
  stock_space: number;

  @Column({ type: 'simple-json', nullable: true })
  delivery_period: IDeliveryPeriod;

  // @Column()
  // materials: any; // media multiple all formats

  @OneToMany(() => TagEntity,tag => tag.service)
  tags:TagEntity[]

  @OneToMany(() => ReviewEntity,review => review.service)
  reviews:ReviewEntity[]

  @OneToMany(() => MarketplaceEntity,marketplace => marketplace.service)
  marketplaces:MarketplaceEntity[]
}
