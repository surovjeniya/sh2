import { BaseEntity } from '@app/common';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReviewAnswerEntity } from '../../review-answer/entity/review-answer.entity';
import { ReviewLikeEntity } from '../../review-like/entity/review-like.entity';
import { ServiceEntity } from '../../service/entity/service.entity';

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'int' })
  profile_id: number;

  @Column()
  description: string;

  @ManyToOne(() => ServiceEntity,service => service.reviews)
  @JoinColumn({name:'service_id'})
  service:ServiceEntity

  @OneToMany(() => ReviewLikeEntity,like => like.review)
  likes:ReviewLikeEntity[]

  @OneToMany(() => ReviewAnswerEntity,answer => answer.review)
  answers:ReviewAnswerEntity[]
}
