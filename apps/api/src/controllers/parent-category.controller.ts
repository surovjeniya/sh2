import { ParentCategoryCreate, ParrentCategoryGetMany, ParentCategoryGetOne, ParrentCategoryDelete } from '@app/common';
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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { CATALOG_SERVICE } from '../constant/service';
import { CreateParentCategoryDto } from '../dto/create-parent-category.dto';

@Controller('parent-category')
export class ParentCategoryController {
  constructor(
    @Inject(CATALOG_SERVICE) private readonly catalogClient: ClientProxy,
  ) {}

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
  async getParentCategories(){
    const parentCaregoryGetManyResponse = await lastValueFrom(
      this.catalogClient
        .send<ParrentCategoryGetMany.Response[], ParrentCategoryGetMany.Request>(
          ParrentCategoryGetMany.topic,
          {},
        )
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

  @Delete(':id')
  async deleteParentCategory(@Param('id',new ParseIntPipe()) id:number){
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
    return parentCategoryDeleteResponse
  }
}
