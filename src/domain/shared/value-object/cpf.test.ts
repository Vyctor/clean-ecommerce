import { Cpf } from './cpf';

describe('Cpf Value Object Unit Test', () => {
  it('should create a new cpf with the provided value', () => {
    const cpf = new Cpf('700.966.211-84');
    expect(cpf.value).toBe('700.966.211-84');
  });

  it('should throw an error if the provided value is invalid', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Cpf('700.966.211-85');
    }).toThrowError('Invalid CPF');
  });

  it('should throw an error if the provided value is null', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Cpf('');
    }).toThrowError('Invalid CPF');
  });

  it('should throw an error if the provided value bigger than an cpf', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Cpf('700.966.211-841');
    }).toThrowError('Invalid CPF');
  });

  it('should throw an error if the provided value smaller than an cpf', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Cpf('700966211');
    }).toThrowError('Invalid CPF');
  });
});
