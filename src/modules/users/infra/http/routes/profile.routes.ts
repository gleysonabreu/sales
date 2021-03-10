import { Router } from 'express';
import authMiddleware from '@shared/infra/http/middlewares/auth';
import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(authMiddleware);
profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;
