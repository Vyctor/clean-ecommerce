export class Cpf {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid CPF');
    }
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }

  private validate(str: string): boolean {
    const nullOrUndefined = str === null || str === undefined;
    const invalidLength = str.length < 11 || str.length > 14;

    if (nullOrUndefined) {
      return false;
    }

    if (invalidLength) {
      return false;
    }

    const cpfWithoutMask = str.replace(/[^\d]/g, '');
    const cpfSplittedArray = cpfWithoutMask.split('');
    const cpf = cpfSplittedArray.slice(0, 9);

    const firstDigit = this.calculateFirstVerificationDigit(cpf);
    cpf.push(firstDigit.toString());

    const secondDigit = this.calculateSecondVerificationDigit(cpf);
    cpf.push(secondDigit.toString());

    return cpf.join('') === cpfWithoutMask;
  }

  private calculateFirstVerificationDigit(cpfFirstNineDigits: string[]): number {
    const sumOfNineFirstDigitsPlusIndex = cpfFirstNineDigits.reduce((acc, curr, index) => {
      if (index < 9) {
        return acc + parseInt(curr) * (10 - index);
      }
      return acc;
    }, 0);

    let firstDigit;

    if (sumOfNineFirstDigitsPlusIndex % 11 < 2) {
      firstDigit = 0;
    } else {
      firstDigit = 11 - (sumOfNineFirstDigitsPlusIndex % 11);
    }

    return firstDigit;
  }

  private calculateSecondVerificationDigit(cpfFirstTenDigits: string[]): number {
    const sumOfTenFirstDigitsPlusIndex = cpfFirstTenDigits.reduce((acc, curr, index) => {
      if (index < 10) {
        return acc + parseInt(curr) * (11 - index);
      }
      return acc;
    }, 0);

    let secondDigit;

    if (sumOfTenFirstDigitsPlusIndex % 11 < 2) {
      secondDigit = 0;
    } else {
      secondDigit = 11 - (sumOfTenFirstDigitsPlusIndex % 11);
    }

    return secondDigit;
  }
}
