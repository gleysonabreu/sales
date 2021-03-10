import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { hash as encryptPassword } from '@shared/services/Crypt';
import * as Yup from 'yup';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    await schema.validate({ name, email, password }, { abortEarly: false });

    const findEmail = await this.usersRepository.findAny({ email });
    if (findEmail) throw new AppError('This email already exists');

    const passwordEncrypt = await encryptPassword(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordEncrypt,
    });
    return user;
  }
}

export default CreateUserService;
