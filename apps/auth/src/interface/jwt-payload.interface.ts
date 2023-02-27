import { Role } from "../user/entity/user.entity"

export interface IJwtTokenPayload {
    id:number
    confirmed:boolean
    blocked:boolean
    profile_id?:number
    role:Role
}