import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import { compare, hash } from '@shared/services/Crypt';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
  passwordConfirm?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    name,
    oldPassword,
    password,
    userId,
    passwordConfirm,
  }: IRequest): Promise<User> {
    const schema = Yup.object().shape({
      userId: Yup.string().uuid().required(),
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      oldPassword: Yup.string(),
      password: Yup.string().optional(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')])
        .when('password', { is: pass => pass, then: Yup.string().required() }),
    });
    await schema.validate(
      { userId, email, name, oldPassword, password, passwordConfirm },
      { abortEarly: false },
    );

    const user = await this.usersRepository.findAny({ id: userId });
    if (!user) throw new AppError('User not found.');

    const emailAreadyExists = await this.usersRepository.findAny({ email });
    if (emailAreadyExists && emailAreadyExists.id !== userId)
      throw new AppError('There is already one user with this email.');

    if (password && !oldPassword)
      throw new AppError('Old password is required.');

    if (password && oldPassword) {
      if (!(await compare(oldPassword, user.password)))
        throw new AppError('Old password does not match');

      user.password = await hash(password);
    }

    user.email = email;
    user.name = name;
    await this.usersRepository.update(user);
    return user;
  }
}

export default UpdateUserService;
