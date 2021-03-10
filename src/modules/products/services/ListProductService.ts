import { inject, injectable } from 'tsyringe';
import RedisCache from '@shared/cache/RedisCache';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-sales-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll();
      await redisCache.save('api-sales-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
