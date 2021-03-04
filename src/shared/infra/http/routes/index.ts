import { Router } from 'express';
import productRoutes from '@modules/products/infra/http/routes/product.routes';
import userRoutes from '@modules/users/infra/http/routes/user.routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);

export default routes;
