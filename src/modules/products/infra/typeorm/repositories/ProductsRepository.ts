import { getRepository, Repository } from 'typeorm';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../entities/Product';
import IProductsRepository from '../../../repositories/IProductsRepository';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async updateQuantity(
    products: { id: string; quantity: number }[],
  ): Promise<void> {
    await this.ormRepository.save(products);
  }

  async findName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ name });
    return product;
  }

  async create(product: ICreateProductDTO): Promise<Product> {
    const createProduct = this.ormRepository.create(product);
    await this.ormRepository.save(createProduct);

    return createProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  async show(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ id });
    return product;
  }

  async update(product: Product): Promise<Product> {
    const updateProduct = await this.ormRepository.save(product);
    return updateProduct;
  }

  async delete(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export default ProductsRepository;
