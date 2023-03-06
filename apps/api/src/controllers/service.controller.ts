import { ServiceCreate } from '@app/common';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { CATALOG_SERVICE } from '../constant/service';
import { CreateServiceDto } from '../dto/create-service.dto';

@Controller('service')
export class ServiceController {
  constructor(
    @Inject(CATALOG_SERVICE) private readonly catalogClient: ClientProxy,
  ) {}

  @Post()
  async createService(@Body() dto: CreateServiceDto) {
    const createServiceResponse = await lastValueFrom(
      this.catalogClient
        .send<ServiceCreate.Response,ServiceCreate.Request>(
          ServiceCreate.topic,
          { ...dto },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return createServiceResponse
  }
}