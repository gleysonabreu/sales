import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRoutes = Router();
const passwordController = new ForgotPasswordController();

passwordRoutes.post('/', passwordController.create);
passwordRoutes.post('/reset', passwordController.reset);

export default passwordRoutes;
