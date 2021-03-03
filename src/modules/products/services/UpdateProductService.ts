import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ name, price, quantity, id }: IRequest): Promise<Product> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      id: Yup.string().uuid().required(),
    });
    await schema.validate({ name, price, quantity, id }, { abortEarly: false });

    const product = await this.productsRepository.show(id);
    if (!product) throw new AppError('Product not found.');

    const productNameAlreadyExists = await this.productsRepository.findName(
      name,
    );
    if (productNameAlreadyExists)
      throw new AppError('This product already exists with this name');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.update(product);
    return product;
  }
}

export default UpdateProductService;
