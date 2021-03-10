import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import CreateCustomerService from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';

class CustomerController {
  async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, perPage } = request.query;
    const listCustomerService = container.resolve(ListCustomerService);
    const { customers, totalCustomers } = await listCustomerService.execute({
      page: Number(page),
      perPage: Number(perPage),
    });

    response.header('X-Total-Count', `${totalCustomers}`);
    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = container.resolve(ShowCustomerService);
    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = container.resolve(CreateCustomerService);
    const customer = await createCustomerService.execute({ name, email });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomerService = container.resolve(UpdateCustomerService);
    const customer = await updateCustomerService.execute({ name, email, id });

    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);
    await deleteCustomerService.execute({ id });
    return response.sendStatus(204);
  }
}

export default CustomerController;
