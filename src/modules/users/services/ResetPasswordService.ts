import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from '@shared/services/Crypt';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  token: string;
  password: string;
  passwordConfirm: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password, passwordConfirm }: IRequest): Promise<void> {
    const schema = Yup.object().shape({
      token: Yup.string().uuid().required(),
      password: Yup.string().required(),
      passwordConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    });
    await schema.validate(
      { token, password, passwordConfirm },
      { abortEarly: false },
    );

    const userToken = await this.userTokensRepository.findAny({ token });
    if (!userToken) throw new AppError('Invalid token, try again.');

    const user = await this.usersRepository.findAny({ id: userToken.userId });
    if (!user) throw new AppError('User does not exists.');

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(
      tokenCreatedAt,
      Number(process.env.FORGOT_PASSWORD_TIME),
    );

    if (isAfter(Date.now(), compareDate))
      throw new AppError('Token expired, try again.');

    user.password = await hash(password);
    await this.usersRepository.update(user);
  }
}

export default ResetPasswordService;
