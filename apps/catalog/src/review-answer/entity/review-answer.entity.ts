import { BaseEntity } from "@app/common";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ReviewEntity } from "../../review/entity/review.entity";

@Entity({name:'review-answer'})
export class ReviewAnswerEntity  extends BaseEntity{
    @Column()
    profile_id:number
    
    @ManyToOne(() => ReviewEntity,review => review.answers)
    @JoinColumn({name:'review_id'})
    review:ReviewEntity
}