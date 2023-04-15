import { v4 as uuidV4 } from 'uuid';

export class Id {
  private readonly _id: string;

  constructor(id?: string) {
    this._id = id ?? uuidV4();
  }

  get id(): string {
    return this._id;
  }
}
