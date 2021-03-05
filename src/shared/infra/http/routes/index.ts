import { Router } from 'express';
import productRoutes from '@modules/products/infra/http/routes/product.routes';
import userRoutes from '@modules/users/infra/http/routes/user.routes';
import authRoutes from '@modules/users/infra/http/routes/auth.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/forgotpassword', passwordRoutes);

export default routes;
