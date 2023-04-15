import { BaseEntity } from '../../shared/entity/base-entity';
import { type Id } from '../../shared/value-object/id';

interface CouponProps {
  id?: Id;
  code: string;
  percentage: number;
  expirationDate: Date;
}

export class Coupon extends BaseEntity {
  private readonly _code: string;
  private readonly _percentage: number;
  private readonly _expirationDate: Date;

  constructor(props: CouponProps) {
    super(props.id);
    this._code = props.code;
    this._percentage = props.percentage;
    this._expirationDate = props.expirationDate;
    this.validate();
  }

  get code(): string {
    return this._code;
  }

  get percentage(): number {
    return this._percentage;
  }

  get expirationDate(): Date {
    return this._expirationDate;
  }

  public isExpired(): boolean {
    return this._expirationDate.getTime() < new Date().getTime();
  }

  private validate(): void {
    if (this._percentage < 0 || this._percentage > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }

    if (this._code.length < 3 || this._code.length > 20) {
      throw new Error('Code must have between 3 and 20 characters');
    }

    if (this._code.match(/[^a-zA-Z0-9]/) != null) {
      throw new Error('Code must have only letters and numbers');
    }
  }
}
