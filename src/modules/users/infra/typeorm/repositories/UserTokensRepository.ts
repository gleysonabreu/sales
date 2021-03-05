import {
  getRepository,
  ObjectLiteral,
  FindConditions,
  Repository,
} from 'typeorm';
import IUserTokensRepository from '../../../repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async findAny(
    findOptions: FindConditions<UserToken> | ObjectLiteral,
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: findOptions,
    });
    return userToken;
  }

  async create(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ userId });
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
