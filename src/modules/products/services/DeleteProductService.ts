import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.show(id);
    if (!product) throw new AppError('Product not found.');

    await this.productsRepository.delete(product);
  }
}

export default DeleteProductService;
