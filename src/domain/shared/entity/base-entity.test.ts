import { Id } from '../value-object/id';
import { BaseEntity } from './base-entity';
describe('Base Entity Unit Test', () => {
  it('should create a base entity', () => {
    const entity = new BaseEntity();
    expect(entity).toBeDefined();
    expect(entity.createdAt).toBeDefined();
    expect(entity.updatedAt).toBeDefined();
    expect(entity.id).toBeDefined();
  });

  it('should create a base entity with custom values', () => {
    const date = new Date();
    const id = new Id('123');
    const entity = new BaseEntity(id, date, date);

    expect(entity).toBeDefined();
    expect(entity.createdAt).toEqual(date);
    expect(entity.updatedAt).toEqual(date);
    expect(entity.id).toEqual(id);
  });

  it('should update the updatedAt property', () => {
    const entity = new BaseEntity();
    const date = new Date();
    entity.updatedAt = date;
    expect(entity.updatedAt).toEqual(date);
  });
});
