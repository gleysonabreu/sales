import { Router } from 'express';
import authMiddleware from '@shared/infra/http/middlewares/auth';
import CustomerController from '../controllers/CustomerController';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.use(authMiddleware);
customerRoutes.get('/', customerController.index);
customerRoutes.get('/:id', customerController.show);
customerRoutes.post('/', customerController.create);
customerRoutes.put('/:id', customerController.update);
customerRoutes.delete('/:id', customerController.delete);

export default customerRoutes;
