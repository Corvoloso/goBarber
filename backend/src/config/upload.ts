import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const filePath = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk',
  tmpFolder: string;
  uploadFolder: string;

  multer: {
    storage: StorageEngine;
  }

  config: {
    disk: {},
    aws: {
      bucket: string,
    }
  }

};

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder: filePath,
  uploadFolder: path.resolve(filePath, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: filePath,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(18).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    })
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber'
    }
  }
} as IUploadConfig;
