import { FindConditions, ObjectLiteral } from 'typeorm';
import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  findAny(
    _findOptions: FindConditions<UserToken> | ObjectLiteral,
  ): Promise<UserToken | undefined>;
  create(_userId: string): Promise<UserToken>;
}
