import { v4, validate } from 'uuid';
import { Id } from './id';

describe('Id Value Object Unit Test', () => {
  it("should create a new id if it's not provided", () => {
    const id = new Id();
    expect(validate(id.id)).toBe(true);
  });

  it('should create a new id with the provided value', () => {
    const valueId = v4();
    const id = new Id(valueId);

    expect(id.id).toBe(valueId);
  });
});
