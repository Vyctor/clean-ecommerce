import { type Product } from '../../../domain/product/entity/product';
import { type Repository } from '../../../domain/shared/repository/repository';

export class ProductInMemoryRepository implements Repository<Product> {
  private readonly inMemoryDatabase: Product[];

  constructor() {
    this.inMemoryDatabase = new Array<Product>();
  }

  async create(entity: Product): Promise<void> {
    this.inMemoryDatabase.push(entity);
  }

  async update(entity: Product): Promise<void> {
    const index = this.inMemoryDatabase.findIndex((item) => item.id.id === entity.id.id);

    entity.updatedAt = new Date();

    this.inMemoryDatabase[index] = entity;
  }

  async delete(id: string): Promise<void> {
    const index = this.inMemoryDatabase.findIndex((item) => item.id.id === id);
    this.inMemoryDatabase.splice(index, 1);
  }

  async find(id: string): Promise<Product> {
    const product = this.inMemoryDatabase.find((item) => item.id.id === id);

    return product as Product;
  }

  async findAll(): Promise<Product[]> {
    return this.inMemoryDatabase;
  }
}
