import { Customer } from './customer';
import { Cpf } from '../../shared/value-object/cpf';

describe('Customer Entity Unit Test', () => {
  it('should create a valid customer', () => {
    const cpf = new Cpf('700.966.211-84');
    const customer = new Customer({ cpf });

    expect(customer.cpf).toBe('700.966.211-84');
    expect(customer.id.id).toBeDefined();
  });
});
