import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowOrderService from '../../../services/ShowOrderService';
import CreateOrderService from '../../../services/CreateOrderService';

class OrderController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderService = container.resolve(ShowOrderService);
    const order = await showOrderService.execute({ id });

    return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;

    const createOrderService = container.resolve(CreateOrderService);
    const order = await createOrderService.execute({ customerId, products });

    return response.json(order);
  }
}

export default OrderController;
