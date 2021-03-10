import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  perPage: number;
  page: number;
}

interface IResponse {
  customers: Customer[];
  totalCustomers: number;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ page, perPage }: IRequest): Promise<IResponse> {
    const take = perPage || Number(process.env.SALES_API_PER_PAGE_ITEMS);
    const schema = Yup.object().shape({
      perPage: Yup.number().required(),
      page: Yup.number().required(),
    });
    await schema.validate({ page, perPage: take }, { abortEarly: false });

    const skip = (page - 1) * take;
    const totalCustomers = (await this.customersRepository.findAll()).length;
    const customers = await this.customersRepository.findAll(take, skip);
    return { customers, totalCustomers };
  }
}

export default ListCustomerService;
