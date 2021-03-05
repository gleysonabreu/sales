import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordToken {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });
    await schema.validate({ email }, { abortEarly: false });

    const user = await this.usersRepository.findAny({ email });
    if (!user) throw new AppError('User does not exists.');

    await this.userTokensRepository.create(user.id);
  }
}

export default SendForgotPasswordToken;
