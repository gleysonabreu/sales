import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListUserService from '../../../services/ListUserService';
import CreateUserService from '../../../services/CreateUserService';

class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);
    const users = await listUserService.execute();

    return response.json(classToClass(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}

export default UserController;
