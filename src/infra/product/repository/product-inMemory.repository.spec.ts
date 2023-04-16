import { ProductInMemoryRepository } from './product-inMemory.repository';
import { Product } from '../../../domain/product/entity/product';

describe('InMemoryProductRepository', () => {
  let productInMemoryRepository: ProductInMemoryRepository;

  beforeEach(async () => {
    productInMemoryRepository = new ProductInMemoryRepository();
  });

  it('should be able to create a new product', async () => {
    const product = new Product({
      name: 'Product A',
      price: 10,
    });

    await productInMemoryRepository.create(product);

    const productFound = await productInMemoryRepository.find(product.id.id);

    expect(productFound).toEqual(product);
    expect(productFound.id.id).toEqual(product.id.id);
    expect(productFound.name).toEqual(product.name);
    expect(productFound.price).toEqual(product.price);
  });

  it('should be able to update a product', async () => {
    const product = new Product({
      name: 'Product A',
      price: 10,
    });

    await productInMemoryRepository.create(product);
    let productFound = await productInMemoryRepository.find(product.id.id);
    expect(productFound).toEqual(product);
    expect(productFound.id.id).toEqual(product.id.id);

    product.price = 20;
    await productInMemoryRepository.update(product);

    productFound = await productInMemoryRepository.find(product.id.id);
    expect(productFound).toEqual(product);
    expect(productFound.id.id).toEqual(product.id.id);
    expect(productFound.price).toEqual(product.price);
  });

  it('should be able to delete a product', async () => {
    const product = new Product({
      name: 'Product A',
      price: 10,
    });

    await productInMemoryRepository.create(product);
    let productFound = await productInMemoryRepository.find(product.id.id);
    expect(productFound).toEqual(product);
    expect(productFound.id.id).toEqual(product.id.id);

    await productInMemoryRepository.delete(product.id.id);

    productFound = await productInMemoryRepository.find(product.id.id);
    expect(productFound).toBeUndefined();
  });

  it("should be able to find a product by it's id", async () => {
    const product = new Product({
      name: 'Product A',
      price: 10,
    });

    await productInMemoryRepository.create(product);

    const productFound = await productInMemoryRepository.find(product.id.id);

    expect(productFound).toEqual(product);
    expect(productFound.id.id).toEqual(product.id.id);
  });

  it('should be able to find all products', async () => {
    const productA = new Product({
      name: 'Product A',
      price: 10,
    });

    const productB = new Product({
      name: 'Product B',
      price: 20,
    });

    await productInMemoryRepository.create(productA);
    await productInMemoryRepository.create(productB);

    const productsFound = await productInMemoryRepository.findAll();

    expect(productsFound).toHaveLength(2);
    expect(productsFound).toEqual(expect.arrayContaining([productA, productB]));
  });
});
