import Product from '@modules/products/infra/typeorm/entities/Product';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
} from 'typeorm';
import Order from './Order';

@Entity('orders_products')
class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.ordersProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.ordersProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default OrderProduct;
