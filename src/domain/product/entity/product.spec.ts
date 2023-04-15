import { Product } from './product';

describe('Product Entity Unit Test', () => {
  it('should create a product', () => {
    // Arrange
    const props = {
      name: 'Product 1',
      price: 10,
    };

    // Act
    const product = new Product(props);

    // Assert
    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeDefined();
    expect(product.name).toEqual(props.name);
    expect(product.price).toEqual(props.price);
  });

  it('should not create a product with price less or equal zero', () => {
    const props = {
      name: 'Product 1',
      price: -10,
    };

    // Act
    expect(() => new Product(props)).toThrowError('Price cannot be less than zero');
  });

  it('should not create a product with empty name', () => {
    const props = {
      name: '',
      price: 10,
    };

    // Act
    expect(() => new Product(props)).toThrowError('Name cannot be empty');
  });

  it('should not update a product with price equal or less than zero', () => {
    const props = {
      name: 'Product',
      price: 10,
    };

    const product = new Product(props);

    // Act
    expect(() => {
      product.price = 0;
    }).toThrowError('Price cannot be less than zero');
  });

  it('should not update a product with empty name', () => {
    const props = {
      name: 'Product',
      price: 10,
    };

    const product = new Product(props);

    // Act
    expect(() => {
      product.name = '';
    }).toThrowError('Name cannot be empty');
  });
});
