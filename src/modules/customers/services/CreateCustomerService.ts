import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ name, email }: IRequest): Promise<Customer> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });
    await schema.validate({ name, email }, { abortEarly: false });

    const emailAlreadyExists = await this.customersRepository.findAny({
      email,
    });

    if (emailAlreadyExists) throw new AppError('Email address already used');

    const customer = await this.customersRepository.create({ name, email });
    return customer;
  }
}

export default CreateCustomerService;
