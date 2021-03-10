import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  avatar: string;
}

@injectable()
class UploadAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, avatar }: IRequest): Promise<User> {
    const schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
      avatar: Yup.string().required(),
    });
    await schema.validate({ id, avatar }, { abortEarly: false });

    const user = await this.usersRepository.findAny({ id });
    if (!user) throw new AppError('User not found');

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar;
    const userUpdated = await this.usersRepository.update(user);
    return userUpdated;
  }
}

export default UploadAvatarService;
