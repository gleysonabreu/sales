import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import * as Yup from 'yup';
import { sign } from '@shared/services/Token';
import { compare as comparePassword } from '@shared/services/Crypt';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    await schema.validate({ email, password }, { abortEarly: false });

    const user = await this.usersRepository.findAny({ email });
    if (!user) throw new AppError('This email or password is incorrect!', 401);

    if (!(await comparePassword(password, user.password)))
      throw new AppError('This email or password is incorrect!', 401);

    const token = sign({ id: user.id });

    return { user, token };
  }
}

export default CreateSessionService;
