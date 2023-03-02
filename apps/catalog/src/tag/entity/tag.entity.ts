import { BaseEntity } from "@app/common";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ServiceEntity } from "../../service/entity/service.entity";

@Entity({name:'tag'})
export class TagEntity extends BaseEntity{
    @Column()
    name:string

    @ManyToOne(() => ServiceEntity,service => service.tags)
    @JoinColumn({name:'service_id'})
    service:ServiceEntity
}   