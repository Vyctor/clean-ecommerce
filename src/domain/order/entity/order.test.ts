import { Product } from '../../product/entity/product';
import { Customer } from '../../customer/entity/customer';
import { Cpf } from '../../shared/value-object/cpf';
import { Order } from './order';
import { Coupon } from '../value-object/coupon';

describe('Order Entity Unit Test', () => {
  it('should create an order', () => {
    const props = {
      customer: new Customer({
        cpf: new Cpf('700.966.211-84'),
      }),
    };

    const order = new Order(props);

    expect(order.id).toBeDefined();
    expect(order.calculateTotal()).toEqual(0);
    expect(order.showCart()).toEqual([]);
    expect(order.customer).toEqual(props.customer);
  });

  it("should add a product to the order's cart", () => {
    const props = {
      customer: new Customer({
        cpf: new Cpf('700.966.211-84'),
      }),
    };

    const order = new Order(props);

    const product = new Product({
      name: 'Product 1',
      price: 10,
    });

    order.addProduct(product, 1);

    expect(order.showCart()).toEqual([{ product, quantity: 1 }]);
    expect(order.calculateTotal()).toEqual(10);
  });

  it('should not add a product with quantity less or equal zero', () => {
    const props = {
      customer: new Customer({
        cpf: new Cpf('700.966.211-84'),
      }),
    };

    const order = new Order(props);

    expect(() => {
      const product = new Product({
        name: 'Product 1',
        price: 10,
      });

      order.addProduct(product, 0);
    }).toThrowError('Quantity cannot be less than zero');
  });

  it('should remove a product from the order', () => {
    const props = {
      customer: new Customer({
        cpf: new Cpf('700.966.211-84'),
      }),
    };

    const order = new Order(props);

    const product = new Product({
      name: 'Product 1',
      price: 10,
    });

    order.addProduct(product, 1);

    expect(order.showCart()).toEqual([{ product, quantity: 1 }]);
    expect(order.calculateTotal()).toEqual(10);

    order.removeProduct(product.id.id);

    expect(order.showCart()).toEqual([]);
    expect(order.calculateTotal()).toEqual(0);
  });

  it('should not remove a product that is not in the order', () => {
    const props = {
      customer: new Customer({
        cpf: new Cpf('700.966.211-84'),
      }),
    };

    const order = new Order(props);

    const product = new Product({
      name: 'Product 1',
      price: 10,
    });

    expect(() => {
      order.removeProduct(product.id.id);
    }).toThrowError('Product not found');
  });

  it('should add a coupon to the order', () => {
    const props = {
      customer: new Customer({
        cpf: new Cpf('700.966.211-84'),
      }),
    };

    const order = new Order(props);

    const product = new Product({
      name: 'Product 1',
      price: 10,
    });

    order.addProduct(product, 1);

    expect(order.showCart()).toEqual([{ product, quantity: 1 }]);
    expect(order.calculateTotal()).toEqual(10);

    const coupon = new Coupon({
      code: '123',
      percentage: 10,
      expirationDate: new Date('2023-12-31'),
    });

    order.addCoupon(coupon);

    expect(order.calculateTotal()).toEqual(9);
  });

  it('should throw when try to add a expired coupon to the order', () => {
    const props = {
      customer: new Customer({
        cpf: new Cpf('700.966.211-84'),
      }),
    };

    const order = new Order(props);

    const product = new Product({
      name: 'Product 1',
      price: 10,
    });

    order.addProduct(product, 1);

    expect(order.showCart()).toEqual([{ product, quantity: 1 }]);
    expect(order.calculateTotal()).toEqual(10);

    const coupon = new Coupon({
      code: '123',
      percentage: 10,
      expirationDate: new Date('2020-12-31'),
    });

    expect(() => {
      order.addCoupon(coupon);
    }).toThrowError('Coupon is expired');
  });
});
