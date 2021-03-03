import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.index);
productRoutes.get('/:id', productController.show);
productRoutes.post('/', productController.create);
productRoutes.put('/:id', productController.update);
productRoutes.delete('/:id', productController.delete);

export default productRoutes;
