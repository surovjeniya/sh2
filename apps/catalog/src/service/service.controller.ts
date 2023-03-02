import { Controller } from "@nestjs/common";
import { ServiceService } from "./service.service";

@Controller()
export class ServiceController {
    constructor(private readonly serviceService:ServiceService){}
}