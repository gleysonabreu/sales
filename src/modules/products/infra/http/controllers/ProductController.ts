import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProductController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = container.resolve(ListProductService);
    const products = await listProductsService.execute();

    return response.json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProductService = container.resolve(ShowProductService);
    const product = await showProductService.execute({ id });

    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = container.resolve(CreateProductService);
    const createProduct = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.json(createProduct);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductService = container.resolve(UpdateProductService);
    const updateProduct = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(updateProduct);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id });

    return response.sendStatus(204);
  }
}

export default ProductController;
