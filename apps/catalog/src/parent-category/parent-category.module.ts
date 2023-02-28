import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategoryEntity } from './entity/parent-category.entity';
import { ParrentCategoryController } from './parent-category.controller';
import { ParentCategoryService } from './parent-category.service';


@Module({
  imports: [TypeOrmModule.forFeature([ParentCategoryEntity]),RmqModule],
  controllers: [ParrentCategoryController],
  providers: [ParentCategoryService],
})
export class ParentCategoryModule {}
