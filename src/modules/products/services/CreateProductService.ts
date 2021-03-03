import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productAlreadyExists = await this.productsRepository.findName(name);
    if (productAlreadyExists)
      throw new AppError('This product already exists with this name');

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
