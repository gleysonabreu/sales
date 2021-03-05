import { FindConditions, ObjectLiteral } from 'typeorm';
import ICreateUser from '../dtos/ICreateUser';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findAny(
    _findOptions: FindConditions<User> | ObjectLiteral,
  ): Promise<User | undefined>;
  create(_user: ICreateUser): Promise<User>;
  findAll(): Promise<User[]>;
  update(_user: User): Promise<User>;
}
