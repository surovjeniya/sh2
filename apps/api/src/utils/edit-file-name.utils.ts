import { Request } from 'express';
import { extname } from 'path';
import { v4 } from 'uuid';


export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback,
) => {
  const name = v4();
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
