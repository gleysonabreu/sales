import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import { resolve } from 'path';
import AppError from '@shared/errors/AppError';
import EmailService from '@shared/services/EmailService';
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
    const path = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'templates',
      'email',
      'forgotPassword.hbs',
    );
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });
    await schema.validate({ email }, { abortEarly: false });

    const user = await this.usersRepository.findAny({ email });
    if (!user) throw new AppError('User does not exists.');

    const { token } = await this.userTokensRepository.create(user.id);
    await EmailService.sendMail({
      path,
      subject: 'Forgot Password SalesAPI',
      to: user.email,
      variables: {
        name: user.name,
        token,
        link: String(process.env.SALES_API_DEFAULT_URL),
      },
    });
  }
}

export default SendForgotPasswordToken;
