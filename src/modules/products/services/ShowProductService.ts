import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.show(id);
    if (!product) throw new AppError('Product not found.');

    return product;
  }
}

export default ShowProductService;
