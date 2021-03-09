import { FindConditions, ObjectLiteral } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
  findAny(
    _options: FindConditions<Customer> | ObjectLiteral,
  ): Promise<Customer | undefined>;
  findAll(): Promise<Customer[]>;
  create(_customer: ICreateCustomerDTO): Promise<Customer>;
  update(_customer: Customer): Promise<Customer>;
  delete(_customer: Customer): Promise<void>;
}
