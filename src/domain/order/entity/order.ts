import { type Product } from '../../product/entity/product';
import { type Customer } from '../../customer/entity/customer';
import { BaseEntity } from '../../shared/entity/base-entity';
import { type Id } from '../../shared/value-object/id';

interface OrderProps {
  id?: Id;
  customer: Customer;
}

interface OrderProduct {
  product: Product;
  quantity: number;
}

export class Order extends BaseEntity {
  private readonly _customer: Customer;
  private readonly _products: OrderProduct[];
  constructor(props: OrderProps) {
    super(props.id);
    this._customer = props.customer;
    this._products = [];
  }

  get customer(): Customer {
    return this._customer;
  }

  public showCart(): OrderProduct[] {
    return this._products;
  }

  public addProduct(product: Product, quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity cannot be less than zero');
    }

    this._products.push({ product, quantity });
  }

  public removeProduct(productId: string): void {
    const index = this._products.findIndex((product) => product.product.id.id === productId);

    if (index === -1) {
      throw new Error('Product not found');
    }

    this._products.splice(index, 1);
  }

  public calculateTotal(): number {
    return this._products.reduce((total, product) => total + product.product.price * product.quantity, 0);
  }
}
