import { BaseEntity } from '../../shared/entity/base-entity';
import { type Id } from '../../shared/value-object/id';

interface ProductProps {
  id?: Id;
  name: string;
  price: number;
}

export class Product extends BaseEntity {
  private _name: string;
  private _price: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._price = props.price;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
    this.validate();
  }

  private validate(): void {
    if (this.name.length === 0) {
      throw new Error('Name cannot be empty');
    }

    if (this.price <= 0) {
      throw new Error('Price cannot be less than zero');
    }
  }
}
