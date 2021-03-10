import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customerId: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ customerId, products }: IRequest): Promise<Order> {
    const schema = Yup.object().shape({
      customerId: Yup.string().uuid().required(),
    });
    await schema.validate({ customerId }, { abortEarly: false });

    const customerExists = await this.customersRepository.findAny({
      id: customerId,
    });
    if (!customerExists)
      throw new AppError('Could not find customer with the given id.');

    const existsProducts = await this.productsRepository.findAll();
    const producsExits = existsProducts.filter(productExist =>
      products.map(pOrder => pOrder.id === productExist.id),
    );

    if (!producsExits.length)
      throw new AppError('Could not find products with the given ids.');

    const existsProductsIds = producsExits.map(product => product.id);
    const checkProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkProducts.length)
      throw new AppError(`Could not find product ${checkProducts[0].id}`);

    const quantityAvailable = products.filter(
      product =>
        producsExits.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );
    if (quantityAvailable.length)
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].quantity}`,
      );

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { ordersProducts } = order;

    const updateQuantityProduct = ordersProducts.map(product => ({
      id: product.productId,
      quantity:
        producsExits.filter(p => p.id === product.productId)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(updateQuantityProduct);
    return order;
  }
}

export default CreateOrderService;
