import { type Cpf } from '../../shared/value-object/cpf';
import { type Id } from '../../shared/value-object/id';
import { BaseEntity } from '../../shared/entity/base-entity';

interface CustomerProps {
  id?: Id;
  cpf: Cpf;
}

export class Customer extends BaseEntity {
  private readonly _cpf: Cpf;

  constructor(props: CustomerProps) {
    super(props.id);
    this._cpf = props.cpf;
  }

  get cpf(): string {
    return this._cpf.value;
  }
}
