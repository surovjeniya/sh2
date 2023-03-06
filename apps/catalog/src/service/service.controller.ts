import { RmqService, ServiceCreate } from "@app/common";
import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { ServiceService } from "./service.service";

@Controller()
export class ServiceController {
    constructor(private readonly serviceService:ServiceService,private readonly rmqService:RmqService){}

    @MessagePattern(ServiceCreate.topic)
    async createService(@Payload() payload:ServiceCreate.Request,@Ctx() ctx:RmqContext){
        const service = await this.serviceService.createService(payload)
        this.rmqService.ack(ctx)
        return service
    }
}