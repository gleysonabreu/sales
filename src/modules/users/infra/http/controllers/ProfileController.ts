import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowUserService from '../../../services/ShowUserService';
import UpdateUserService from '../../../services/UpdateUserService';

class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserProfile = container.resolve(ShowUserService);
    const user = await showUserProfile.execute({ id });

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      oldPassword,
      passwordConfirm,
    } = request.body;
    const { id: userId } = request.user;

    const updateUserService = container.resolve(UpdateUserService);
    const updateUser = await updateUserService.execute({
      email,
      name,
      userId,
      oldPassword,
      password,
      passwordConfirm,
    });

    return response.json(classToClass(updateUser));
  }
}

export default ProfileController;
