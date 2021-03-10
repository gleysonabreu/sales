import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UploadAvatarService from '../../../services/UploadAvatarService';

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename: avatar } = request.file;
    const updateAvatarService = container.resolve(UploadAvatarService);
    const user = await updateAvatarService.execute({
      id,
      avatar,
    });

    return response.json(classToClass(user));
  }
}

export default UserAvatarController;
