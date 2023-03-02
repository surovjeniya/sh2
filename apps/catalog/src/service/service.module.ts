import { RmqModule } from "@app/common";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceEntity } from "./entity/service.entity";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";


@Module({
    imports:[TypeOrmModule.forFeature([ServiceEntity]),RmqModule],
    controllers:[ServiceController],
    providers:[ServiceService]
})
export class ServiceModule {}