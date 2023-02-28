import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from './entity/sub-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
  controllers: [],
  providers: [],
})
export class SubCategoryModule {}
