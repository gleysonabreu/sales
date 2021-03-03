import { Router } from 'express';
import productRoutes from '@modules/products/infra/http/routes/product.routes';

const routes = Router();

routes.use('/products', productRoutes);

export default routes;
