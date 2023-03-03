import { Body, Controller, Post } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';

@Controller('service')
export class ServiceController {
    constructor(){}

    @Post()
    async createService(@Body() dto:CreateServiceDto){}
}