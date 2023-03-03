import {
  MarketplaceCreate,
  MarketplaceGetMany,
  MarketplaceGetOne,
  MarketplaceDelete,
  MarketplaceUpdate,
} from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Role } from 'apps/auth/src/user/entity/user.entity';
import { catchError, throwError, lastValueFrom } from 'rxjs';
import { CATALOG_SERVICE } from '../constant/service';
import { Roles } from '../decorator/roles.decorator';
import { CreateMarketplaceDto } from '../dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from '../dto/update-marketplace.dto';
import JwtAuthGuard from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';

@Controller('marketplace')
export class MarketplaceController {
  constructor(
    @Inject(CATALOG_SERVICE) private readonly catalogClient: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteMarketplace(@Param('id', new ParseIntPipe()) id: number) {
    const marketplaceDeleteResponse = await lastValueFrom(
      this.catalogClient
        .send<MarketplaceDelete.Response, MarketplaceDelete.Request>(
          MarketplaceDelete.topic,
          { id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return marketplaceDeleteResponse;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createMarketplace(@Body() dto: CreateMarketplaceDto) {
    const marketplaceCreateResponse = await lastValueFrom(
      this.catalogClient
        .send<MarketplaceCreate.Response, MarketplaceCreate.Request>(
          MarketplaceCreate.topic,
          { ...dto },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return marketplaceCreateResponse;
  }

  @Get()
  async findMarketplaces() {
    const marketplaceGetManyResponse = await lastValueFrom(
      this.catalogClient
        .send<MarketplaceGetMany.Response[], MarketplaceGetMany.Request>(
          MarketplaceGetMany.topic,
          {},
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return marketplaceGetManyResponse;
  }

  @Get(':id')
  async findMarketplace(@Param('id', new ParseIntPipe()) id: number) {
    const marketplaceGetOneResponse = await lastValueFrom(
      this.catalogClient
        .send<MarketplaceGetOne.Response, MarketplaceGetOne.Request>(
          MarketplaceGetOne.topic,
          { id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return marketplaceGetOneResponse;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updateMarketplace(@Param('id', new ParseIntPipe()) id: number,@Body() dto:UpdateMarketplaceDto) {
    const marketplaceUpdateResponse = await lastValueFrom(
      this.catalogClient
        .send<MarketplaceUpdate.Response, MarketplaceUpdate.Request>(MarketplaceUpdate.topic,{
            id,...dto
        })
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return marketplaceUpdateResponse;
  }
}
