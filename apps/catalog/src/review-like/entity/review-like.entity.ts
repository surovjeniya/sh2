import { BaseEntity } from "@app/common"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ReviewEntity } from "../../review/entity/review.entity";

@Entity({name:'review_like'})
export class ReviewLikeEntity extends BaseEntity{
    @Column()
    profile_id:number

    @ManyToOne(() => ReviewEntity,review => review.likes)
    @JoinColumn({name:'review_id'})
    review:ReviewEntity
}