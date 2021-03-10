import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import IFindAllPaginationDTO from '@modules/customers/dtos/IFindAllPaginationDTO';
import {
  FindConditions,
  getRepository,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import ICustomersRepository from '../../../repositories/ICustomersRepository';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  async findAny(
    options: FindConditions<Customer> | ObjectLiteral,
  ): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: options,
    });

    return customer;
  }

  async findAll(take: number = 0, skip: number = 0): Promise<Customer[]> {
    const customers = await this.ormRepository.find({
      take,
      skip,
    });
    return customers;
  }

  async create(customer: ICreateCustomerDTO): Promise<Customer> {
    const createCustomer = this.ormRepository.create(customer);
    await this.ormRepository.save(createCustomer);
    return createCustomer;
  }

  async update(customer: Customer): Promise<Customer> {
    const updateCustomer = await this.ormRepository.save(customer);
    return updateCustomer;
  }

  async delete(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}

export default CustomersRepository;
