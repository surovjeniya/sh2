import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CurrentUser } from "apps/auth/src/decorator/current-user.decorator";
import { IJwtTokenPayload } from "apps/auth/src/interface/jwt-payload.interface";
import { Role } from "apps/auth/src/user/entity/user.entity";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { USER_SERVICE } from "../constant/service";
import { Roles } from "../decorator/roles.decorator";
import JwtAuthGuard from "../guard/jwt-auth.guard";
import { RolesGuard } from "../guard/roles.guard";

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

//   @Post()
//   async createUser(@Body() dto: any) {
//     return await lastValueFrom(
//       this.userClient
//         .send()
//         .pipe(
//           catchError((error) =>
//             throwError(() => new RpcException(error.response)),
//           ),
//         ),
//     );
//   }

//   @UseGuards(JwtAuthGuard)
//   @Put(':id')
//   async updateUser(@Param('id') id: string, @Body() dto: any) {
//     return await lastValueFrom(
//       this.userClient
//         .send()
//         .pipe(
//           catchError((error) =>
//             throwError(() => new RpcException(error.response)),
//           ),
//         ),
//     );
//   }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: string,@CurrentUser() user:IJwtTokenPayload) {
    // return await lastValueFrom(
    //   this.userClient
    //     .send()
    //     .pipe(
    //       catchError((error) =>
    //         throwError(() => new RpcException(error.response)),
    //       ),
    //     ),
    // );
  }

//   @Get(':id')
//   async getUser(@Param('id') id: string) {
//     return await lastValueFrom(
//       this.userClient
//         .send()
//         .pipe(
//           catchError((error) =>
//             throwError(() => new RpcException(error.response)),
//           ),
//         ),
//     );
//   }

//   @Get()
//   async getUsers() {
//     return await lastValueFrom(
//       this.userClient
//         .send()
//         .pipe(
//           catchError((error) =>
//             throwError(() => new RpcException(error.response)),
//           ),
//         ),
//     );
//   }
}