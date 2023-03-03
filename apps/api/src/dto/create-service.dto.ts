import { MarketplaceEntity } from 'apps/catalog/src/marketplace/entity/marketplace.entity';
import { ReviewEntity } from 'apps/catalog/src/review/entity/review.entity';
import { EyesColorEnum } from 'apps/catalog/src/service/entity/enum/eyes-color.enum';
import { HairsColorEnum } from 'apps/catalog/src/service/entity/enum/hairs-color.enum';
import { LearningFormatEnum } from 'apps/catalog/src/service/entity/enum/learning-format.enum';
import { OneUnitOfWorkEnum } from 'apps/catalog/src/service/entity/enum/one-unit-of-work.enum';
import { IAdditionalServices } from 'apps/catalog/src/service/entity/interface/additional-services.interface';
import { IAdditionalTools } from 'apps/catalog/src/service/entity/interface/additional-tools.interface';
import { IAdvantages } from 'apps/catalog/src/service/entity/interface/advantages.interface';
import { IAppList } from 'apps/catalog/src/service/entity/interface/app-list.interface';
import { ICollaborationType } from 'apps/catalog/src/service/entity/interface/collaboration-type.interface';
import { ICounter } from 'apps/catalog/src/service/entity/interface/counter.interface';
import { ICourseDuration } from 'apps/catalog/src/service/entity/interface/course-duration.interface';
import { ICourseLink } from 'apps/catalog/src/service/entity/interface/course-link.interface';
import { IDeliveryPeriod } from 'apps/catalog/src/service/entity/interface/delivery-period.interface';
import { IDeliveryRegion } from 'apps/catalog/src/service/entity/interface/delivery-region.interface';
import { IDiscount } from 'apps/catalog/src/service/entity/interface/discount.interface';
import { IFeatures } from 'apps/catalog/src/service/entity/interface/features.interface';
import { IMinimumVolume } from 'apps/catalog/src/service/entity/interface/minimum-volume.interface';
import { IModelCharacterictics } from 'apps/catalog/src/service/entity/interface/model-characteristics.interface';
import { IPriceInfo } from 'apps/catalog/src/service/entity/interface/price-info.interface';
import { IProductCategory } from 'apps/catalog/src/service/entity/interface/product-category.interface';
import { IRegion } from 'apps/catalog/src/service/entity/interface/region.interface';
import { IRequest } from 'apps/catalog/src/service/entity/interface/request.interface';
import { IServices } from 'apps/catalog/src/service/entity/interface/services.interface';
import { IStockRegion } from 'apps/catalog/src/service/entity/interface/stock-region.interface';
import { ISupply } from 'apps/catalog/src/service/entity/interface/supply.interface';
import { ITakenRegion } from 'apps/catalog/src/service/entity/interface/taken-region.interface';
import { ITariffAnalytics } from 'apps/catalog/src/service/entity/interface/tariff-analytics.interface';
import { ITariff } from 'apps/catalog/src/service/entity/interface/tariff.interface';
import { IVideos } from 'apps/catalog/src/service/entity/interface/videos.interface';
import { ServiceEntity } from 'apps/catalog/src/service/entity/service.entity';
import { TagEntity } from 'apps/catalog/src/tag/entity/tag.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export enum Groups {
  all = 'all',
  seo = 'seo',
  bayer = 'bayer',
  bank = 'bank',
  blogs = 'blogs',
  alert = 'alert',
  parsers = 'parsers',
  positions = 'positions',
  ad = 'ad',
  vykup = 'vykup',
  dizajnery = 'dizajnery',
  other = 'other',
  tools = 'tools',
  info = 'info',
  chat = 'chat',
  channel = 'channel',
  logistika = 'logistika',
  menedzhery = 'menedzhery',
  opt = 'opt',
  'foto-pod-klyuch' = 'foto-pod-klyuch',
  manufacturers,
  proizvodstva,
  packproduction,
  analytics,
  management,
  sertifikacija,
  profi,
  video,
  targetologi,
  product,
  services,
  fotografy,
  fotomodeli,
  fulfillment,
}

export class CreateServiceDto implements ServiceEntity {
  @IsNotEmpty({ groups: [Groups.all] })
  @IsString()
  name: string;
  features: IFeatures;
  reply_time: string;
  start_in_days: number;
  price: number;
  price_info: IPriceInfo;
  advantages: IAdvantages;
  tariff_analytics: ITariffAnalytics;
  videos: IVideos;
  placed_at: Date;
  sub_category_id: number;
  text: string;
  pin_position: number;
  pin_attachment_start_at: Date;
  pin_attachment_finish_at: Date;
  pin_select: boolean;
  pin_select_start_at: Date;
  pin_select_finish_at: Date;
  description: string;
  region: IRegion;
  supply: ISupply;
  credit: string;
  discount: IDiscount;
  demo: string;
  app_list: IAppList;
  portfolio_url: string;
  experience: string;
  course_duration: ICourseDuration;
  course_link: ICourseLink;
  learning_format: LearningFormatEnum;
  users_count: string;
  collection_period: string;
  additional_tools: IAdditionalTools;
  hairs_color: HairsColorEnum;
  eyes_color: EyesColorEnum;
  model_characteristics: IModelCharacterictics;
  one_unit_of_work: OneUnitOfWorkEnum;
  index_service: number;
  counter: ICounter;
  minimum_volume: IMinimumVolume;
  product_category: IProductCategory;
  trial_period: boolean;
  catalog_url: string;
  stm: boolean;
  trial_lesson: boolean;
  installment: boolean;
  tariff: ITariff;
  additional_services: IAdditionalServices;
  request: IRequest;
  services: IServices;
  collaboration_type: ICollaborationType;
  delivery_region: IDeliveryRegion;
  stock_region: IStockRegion;
  taken_region: ITakenRegion;
  stock_space: number;
  delivery_period: IDeliveryPeriod;
  tags: TagEntity[];
  reviews: ReviewEntity[];
  marketplaces: MarketplaceEntity[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
