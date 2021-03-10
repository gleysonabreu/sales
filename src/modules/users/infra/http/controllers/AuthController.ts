import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateSessionService from '../../../services/CreateSessionService';

class AuthController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);
    const user = await createSessionService.execute({
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}

export default AuthController;
