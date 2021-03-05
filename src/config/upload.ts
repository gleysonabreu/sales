import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploaderFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploaderFolder,
  storage: multer.diskStorage({
    destination: uploaderFolder,
    filename(request, file, cb) {
      const hash = crypto.randomBytes(10).toString('hex');
      const filename = `${hash}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};
