import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<User> {
    const schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
    });
    await schema.validate({ id }, { abortEarly: false });

    const user = await this.usersRepository.findAny({ id });
    if (!user) throw new AppError('User not found.');

    return user;
  }
}

export default ShowUserService;
