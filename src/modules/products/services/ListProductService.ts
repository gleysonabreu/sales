import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();
    return products;
  }
}

export default ListProductService;
