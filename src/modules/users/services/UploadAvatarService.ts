import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvieder';
import S3StorageProvieder from '@shared/providers/StorageProvider/S3StorageProvieder';
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
    const uploadProvider =
      uploadConfig.driver === 's3'
        ? new S3StorageProvieder()
        : new DiskStorageProvider();
    const user = await this.usersRepository.findAny({ id });
    if (!user) throw new AppError('User not found');

    if (user.avatar) {
      await uploadProvider.deleteFile(user.avatar);
    }

    const fileName = await uploadProvider.saveFile(avatar);
    user.avatar = fileName;
    const userUpdated = await this.usersRepository.update(user);
    return userUpdated;
  }
}

export default UploadAvatarService;
