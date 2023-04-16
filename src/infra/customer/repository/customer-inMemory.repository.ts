import { type Repository } from 'domain/shared/repository/repository';
import { type Customer } from '../../../domain/customer/entity/customer';

export class CustomerInMemoryRepository implements Repository<Customer> {
  private readonly inMemoryDatabase: Customer[];

  constructor() {
    this.inMemoryDatabase = new Array<Customer>();
  }

  async create(entity: Customer): Promise<void> {
    this.inMemoryDatabase.push(entity);
  }

  async delete(id: string): Promise<void> {
    const index = this.inMemoryDatabase.findIndex((item) => item.id.id === id);
    this.inMemoryDatabase.splice(index, 1);
  }

  async find(id: string): Promise<Customer> {
    const customer = this.inMemoryDatabase.find((item) => item.id.id === id);

    return customer as Customer;
  }

  async findAll(): Promise<Customer[]> {
    return this.inMemoryDatabase;
  }
}
