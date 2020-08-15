import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const filePath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: filePath,
  uploadFolder: path.resolve(filePath, 'uploads'),

  storage: multer.diskStorage({
    destination: filePath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(18).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
