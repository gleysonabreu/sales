import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ id, name, email }: IRequest): Promise<Customer> {
    const schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });
    await schema.validate({ id, name, email }, { abortEarly: false });

    const customer = await this.customersRepository.findAny({ id });
    if (!customer) throw new AppError('Customer not found.');

    const customerEmail = await this.customersRepository.findAny({ email });
    if (customerEmail && email !== customer.email)
      throw new AppError('There is already one customer with this email.');

    customer.name = name;
    customer.email = email;

    await this.customersRepository.update(customer);
    return customer;
  }
}

export default UpdateCustomerService;
