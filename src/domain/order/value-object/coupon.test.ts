import { Coupon } from './coupon';

describe('Coupon Entity Unit Test', () => {
  it('should create a new coupon', () => {
    const props = {
      code: 'VALE20',
      percentage: 20,
      expirationDate: new Date('2023-12-31'),
    };
    const coupon = new Coupon(props);
    expect(coupon.code).toBe(props.code);
    expect(coupon.percentage).toBe(props.percentage);
    expect(coupon.expirationDate).toBe(props.expirationDate);
  });

  it('should be able to verify if a coupon is expired or not', () => {
    const props = {
      code: 'VALE20',
      percentage: 20,
      expirationDate: new Date('2023-12-31'),
    };
    const coupon = new Coupon(props);
    expect(coupon.isExpired()).toBe(false);
  });

  it('should not create a coupon with percentage less than zero', () => {
    const props = {
      code: 'VALE20',
      percentage: -20,
      expirationDate: new Date('2023-12-31'),
    };
    expect(() => new Coupon(props)).toThrowError('Percentage must be between 0 and 100');
  });
  it('should not create a coupon with percentage greater than 100', () => {
    const props = {
      code: 'VALE20',
      percentage: 120,
      expirationDate: new Date('2023-12-31'),
    };
    expect(() => new Coupon(props)).toThrowError('Percentage must be between 0 and 100');
  });

  it('should not create a coupon with code less than 3 characters', () => {
    const props = {
      code: 'VA',
      percentage: 20,
      expirationDate: new Date('2023-12-31'),
    };
    expect(() => new Coupon(props)).toThrowError('Code must have between 3 and 20 characters');
  });

  it('should not create a coupon with code greater than 20 characters', () => {
    const props = {
      code: 'VALE20VALE20VALE20000',
      percentage: 20,
      expirationDate: new Date('2023-12-31'),
    };
    expect(() => new Coupon(props)).toThrowError('Code must have between 3 and 20 characters');
  });

  it('should not create a coupon with code with special characters', () => {
    const props = {
      code: 'VALE20#',
      percentage: 20,
      expirationDate: new Date('2023-12-31'),
    };
    expect(() => new Coupon(props)).toThrowError('Code must have only letters and numbers');
  });
  it('should not create a coupon with code with white spaces', () => {
    const props = {
      code: 'VALE 20',
      percentage: 20,
      expirationDate: new Date('2023-12-31'),
    };
    expect(() => new Coupon(props)).toThrowError('Code must have only letters and numbers');
  });
});
