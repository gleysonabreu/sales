import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import authMiddleware from '../../../../../shared/infra/http/middlewares/auth';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.use(authMiddleware);
orderRoutes.get('/:id', orderController.show);
orderRoutes.post('/', orderController.create);

export default orderRoutes;
