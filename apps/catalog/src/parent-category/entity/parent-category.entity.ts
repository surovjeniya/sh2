import { BaseEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubCategoryEntity } from '../../sub-category/entity/sub-category.entity';

@Entity({ name: 'parent_category' })
export class ParentCategoryEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(
    () => SubCategoryEntity,
    (subCategory) => subCategory.parentCategory,
  )
  subCategories?: SubCategoryEntity[];
}
