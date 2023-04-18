import { Cpf } from './cpf';

describe('Cpf Value Object Unit Test', () => {
  test.each(['407.302.170-27', '684.053.160-00', '746.971.314-01', '25169484097', '06381925019'])(
    'should create a new cpf with the provided value',
    (value) => {
      const cpf = new Cpf(value);
      expect(cpf.value).toBe(value);
    },
  );

  it('should throw an error if cpf if invalid', () => {
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
