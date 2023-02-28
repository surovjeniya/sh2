import { BaseEntity } from '@app/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ParentCategoryEntity } from '../../parent-category/entity/parent-category.entity';

@Entity({ name: 'sub_category' })
export class SubCategoryEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(
    () => ParentCategoryEntity,
    (parentCategory) => parentCategory.subCategories,
  )
  @JoinColumn({name:'parent_category_id'})
  parentCategory?: ParentCategoryEntity;
}
