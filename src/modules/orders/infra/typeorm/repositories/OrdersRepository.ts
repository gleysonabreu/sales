import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import {
  FindConditions,
  getRepository,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import IOrdersRepository from '../../../repositories/IOrdersRepository';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async findAny(
    options: FindConditions<Order> | ObjectLiteral,
  ): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: options,
      relations: ['ordersProducts', 'customer'],
    });
    return order;
  }

  async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const createOrder = this.ormRepository.create({
      customer,
      ordersProducts: products,
    });
    await this.ormRepository.save(createOrder);

    return createOrder;
  }
}

export default OrdersRepository;
