import { inject, injectable } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.findAll();
    return customers;
  }
}

export default ListCustomerService;
