import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IRequest) {
    const schema = Yup.object().shape({
      id: Yup.string().uuid().required(),
    });
    await schema.validate({ id }, { abortEarly: false });

    const customer = await this.customersRepository.findAny({ id });
    if (!customer) throw new AppError('Customer not found.');

    await this.customersRepository.delete(customer);
  }
}

export default DeleteCustomerService;
