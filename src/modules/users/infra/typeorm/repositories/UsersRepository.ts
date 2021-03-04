import ICreateUser from '@modules/users/dtos/ICreateUser';
import {
  FindConditions,
  FindOneOptions,
  getRepository,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  async create(user: ICreateUser): Promise<User> {
    const createUser = this.ormRepository.create(user);
    await this.ormRepository.save(createUser);
    return createUser;
  }

  async findAny(
    findOptions: FindConditions<User> | ObjectLiteral,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: findOptions,
    });
    return user;
  }
}

export default UsersRepository;
