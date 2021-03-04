import { Router } from 'express';
import authMiddleware from '@shared/infra/http/middlewares/auth';
import UserController from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', authMiddleware, userController.index);
userRoutes.post('/', userController.create);

export default userRoutes;
