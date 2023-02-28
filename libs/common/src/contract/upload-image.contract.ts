export namespace UploadImage {
  export const topic = 'upload.image.command';

  export class Request {
      image:Express.Multer.File
  }

  export class Response  {}
}
