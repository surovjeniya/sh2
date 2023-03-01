import { UploadImage } from "@app/common";
import { Controller, Inject, Post, UploadedFile, UseGuards, UseInterceptors,  } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { catchError, lastValueFrom, throwError } from "rxjs";
import { UPLOAD_SERVICE } from "../constant/service";
import JwtAuthGuard from "../guard/jwt-auth.guard";
import { editFileName } from "../utils/edit-file-name.utils";
import { imageFileFilter } from "../utils/image-filter";




@Controller('upload')
export class UploadController {
  constructor(
    @Inject(UPLOAD_SERVICE) private readonly uploadClient: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 1024 * 1024 * 4,
      },
      storage: diskStorage({
        filename: editFileName,
        destination: process.env.UPLOAD_FILES_FOLDER,
      }),
    }),
  )
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    const uploadImageResponse = await lastValueFrom(
      this.uploadClient
        .send<UploadImage.Response, UploadImage.Request>(UploadImage.topic, {
          image,
        })
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
    return uploadImageResponse;
  }
}