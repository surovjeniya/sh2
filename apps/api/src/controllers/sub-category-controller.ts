import { SubCategoryCreate, SubCategoryDelete, SubCategoryGetMany, SubCategoryGetOne, SubCategoryUpdate } from "@app/common";
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { Role } from "apps/auth/src/user/entity/user.entity";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { CATALOG_SERVICE } from "../constant/service";
import { Roles } from "../decorator/roles.decorator";
import { CreateSubCategoryDto } from "../dto/sub-category.create.dto";
import { SubCategoryUpdateDto } from "../dto/sub-category.update.dto";
import JwtAuthGuard from "../guard/jwt-auth.guard";
import { RolesGuard } from "../guard/roles.guard";

@Controller('sub-category')
export class SubCategoryController {
  constructor(
    @Inject(CATALOG_SERVICE) private readonly catalogClient: ClientProxy,
  ) {}

  @Get()
  async getSubCategories() {
    const getManySubCategyResponse = await lastValueFrom(
      this.catalogClient
        .send<SubCategoryGetMany.Response, SubCategoryGetMany.Request>(
          SubCategoryGetMany.topic,
          {},
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return getManySubCategyResponse;
  }

  @Get(':id')
  async getSubCategory(@Param('id', new ParseIntPipe()) id: number) {
    const getOneSubCategoryResponse = await lastValueFrom(
      this.catalogClient
        .send<SubCategoryGetOne.Response, SubCategoryGetOne.Request>(
          SubCategoryGetOne.topic,
          { id },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return getOneSubCategoryResponse;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createSubCategory(@Body() dto: CreateSubCategoryDto) {
    const createSubCategoryResponse = await lastValueFrom(
      this.catalogClient
        .send<SubCategoryCreate.Response, SubCategoryCreate.Request>(
          SubCategoryCreate.topic,
          { ...dto },
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return createSubCategoryResponse;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteSubCategory(@Param('id',new ParseIntPipe()) id:number){
    const deleteSubCategoryResponse = await lastValueFrom(
      this.catalogClient
        .send<SubCategoryDelete.Response, SubCategoryDelete.Request>(
          SubCategoryDelete.topic,
          {id},
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return deleteSubCategoryResponse;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updateSubCategory(@Param('id', new ParseIntPipe()) id:number,@Body() dto:SubCategoryUpdateDto){
    const updateSubCategoryResponse = await lastValueFrom(
      this.catalogClient
        .send<SubCategoryUpdate.Response, SubCategoryUpdate.Request>(
          SubCategoryUpdate.topic,
          {...dto,id},
        )
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return updateSubCategoryResponse;
  }
}