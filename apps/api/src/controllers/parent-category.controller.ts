import { ParentCategoryCreate, ParrentCategoryGetMany, ParentCategoryGetOne, ParrentCategoryDelete,ParentCategoryUpdate } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Put, UseGuards } from '@nestjs/common/decorators';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Role } from 'apps/auth/src/user/entity/user.entity';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { CATALOG_SERVICE } from '../constant/service';
import { Roles } from '../decorator/roles.decorator';
import { CreateParentCategoryDto } from '../dto/create-parent-category.dto';
import { UpdateParentCategoryDto } from '../dto/update-parent-category.dto';
import JwtAuthGuard from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';

@Controller('parent-category')
export class ParentCategoryController {
  constructor(
    @Inject(CATALOG_SERVICE) private readonly catalogClient: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createParentCategory(@Body() dto: CreateParentCategoryDto) {
    const parentCategoryCreateResponse = await lastValueFrom(
      this.catalogClient
        .send<ParentCategoryCreate.Response, ParentCategoryCreate.Request>(
          ParentCategoryCreate.topic,
          { ...dto },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return parentCategoryCreateResponse;
  }

  @Get()
  async getParentCategories() {
    const parentCaregoryGetManyResponse = await lastValueFrom(
      this.catalogClient
        .send<
          ParrentCategoryGetMany.Response[],
          ParrentCategoryGetMany.Request
        >(ParrentCategoryGetMany.topic, {})
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return parentCaregoryGetManyResponse;
  }

  @Get(':id')
  async getParentCategory(@Param('id', new ParseIntPipe()) id: number) {
    const parentCategoryGetOneResponse = await lastValueFrom(
      this.catalogClient
        .send<ParentCategoryGetOne.Response, ParentCategoryGetOne.Request>(
          ParentCategoryGetOne.topic,
          { id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return parentCategoryGetOneResponse;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteParentCategory(@Param('id', new ParseIntPipe()) id: number) {
    const parentCategoryDeleteResponse = await lastValueFrom(
      this.catalogClient
        .send<ParrentCategoryDelete.Response, ParrentCategoryDelete.Request>(
          ParrentCategoryDelete.topic,
          { id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return parentCategoryDeleteResponse;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updateParentCategory(@Body() dto:UpdateParentCategoryDto,@Param('id',new ParseIntPipe()) id:number) {
    const parentCategoryUpdateResponse = await lastValueFrom(
      this.catalogClient
        .send<ParentCategoryUpdate.Response, ParentCategoryUpdate.Request>(
          ParentCategoryUpdate.topic,
          { ...dto,id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return parentCategoryUpdateResponse;
  }
}
