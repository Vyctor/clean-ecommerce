import { Cpf } from '../../../domain/shared/value-object/cpf';
import { Customer } from '../../../domain/customer/entity/customer';
import { CustomerInMemoryRepository } from './customer-inMemory.repository';

describe('InMemoryCustomerRepository', () => {
  let customerInMemoryRepository: CustomerInMemoryRepository;

  beforeEach(() => {
    customerInMemoryRepository = new CustomerInMemoryRepository();
  });

  it('should be able to create a new customer', async () => {
    const customer = new Customer({
      cpf: new Cpf('70096621184'),
    });

    await customerInMemoryRepository.create(customer);

    const customerFound = await customerInMemoryRepository.find(customer.id.id);

    expect(customerFound).toEqual(customer);
    expect(customerFound.id.id).toEqual(customer.id.id);
    expect(customerFound.cpf).toEqual(customer.cpf);
  });

  it('should be able to delete a customer', async () => {
    const customer = new Customer({
      cpf: new Cpf('70096621184'),
    });

    await customerInMemoryRepository.create(customer);
    let customerFound = await customerInMemoryRepository.find(customer.id.id);
    expect(customerFound).toEqual(customer);

    await customerInMemoryRepository.delete(customer.id.id);

    customerFound = await customerInMemoryRepository.find(customer.id.id);
    expect(customerFound).toBeUndefined();
  });

  it("should be able to find a customer by it's id", async () => {
    const customer = new Customer({
      cpf: new Cpf('70096621184'),
    });

    await customerInMemoryRepository.create(customer);
    const customerFound = await customerInMemoryRepository.find(customer.id.id);
    expect(customerFound).toEqual(customer);

    expect(customerFound.id.id).toEqual(customer.id.id);
    expect(customerFound.cpf).toEqual(customer.cpf);
  });

  it('should be able to find all customers', async () => {
    const customerA = new Customer({
      cpf: new Cpf('70096621184'),
    });

    const customerB = new Customer({
      cpf: new Cpf('57782911168'),
    });

    await customerInMemoryRepository.create(customerA);
    await customerInMemoryRepository.create(customerB);

    const customersFound = await customerInMemoryRepository.findAll();

    expect(customersFound).toEqual([customerA, customerB]);
    expect(customersFound[0].id.id).toEqual(customerA.id.id);
    expect(customersFound[0].cpf).toEqual(customerA.cpf);
    expect(customersFound[1].id.id).toEqual(customerB.id.id);
    expect(customersFound[1].cpf).toEqual(customerB.cpf);
  });
});
