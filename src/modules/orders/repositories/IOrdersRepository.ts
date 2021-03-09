import { FindConditions, ObjectLiteral } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrdersRepository {
  findAny(
    _options: FindConditions<Order> | ObjectLiteral,
  ): Promise<Order | undefined>;
  create(_order: ICreateOrderDTO): Promise<Order>;
}
