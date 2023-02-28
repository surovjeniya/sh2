import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { USER_SERVICE } from "../constant/service";
import JwtAuthGuard from "../guard/jwt-auth.guard";

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

//   @UseGuards(JwtAuthGuard)
//   @Delete(':id')
//   async deleteUser(@Param('id') id: string) {
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