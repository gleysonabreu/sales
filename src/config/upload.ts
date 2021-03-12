import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploaderFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  directory: uploaderFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, cb) {
        const hash = crypto.randomBytes(10).toString('hex');
        const filename = `${hash}-${file.originalname}`;

        cb(null, filename);
      },
    }),
  },

  config: {
    aws: {
      bucket: 'api-vendas',
    },
  },
} as IUploadConfig;
