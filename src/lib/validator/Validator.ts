export type IValidatorValue = string | number | null | undefined;
export type IValidatorType = 'required';

export class Validator {
  type: IValidatorType;
  value: IValidatorValue;

  constructor(type: IValidatorType, value: IValidatorValue) {
    this.type = type;
    this.value = value;
  }

  required(): boolean {
    const { value }: { value: any } = this
    if(['', undefined, null].includes(value)) return false
    return true
  }

  validate(): boolean {
    return this[this.type]()
  }

}
