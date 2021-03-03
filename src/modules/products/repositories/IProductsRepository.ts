import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  create(_product: ICreateProductDTO): Promise<Product>;
  findName(_name: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  show(_id: string): Promise<Product | undefined>;
}
