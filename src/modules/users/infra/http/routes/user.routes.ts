import { Router } from 'express';
import authMiddleware from '@shared/infra/http/middlewares/auth';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRoutes.get('/', authMiddleware, userController.index);
userRoutes.post('/', userController.create);

userRoutes.patch(
  '/avatar',
  authMiddleware,
  multer(uploadConfig).single('avatar'),
  userAvatarController.update,
);

export default userRoutes;
