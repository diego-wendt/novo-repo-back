import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { cnpj } from "cpf-cnpj-validator";

@Injectable()
@ValidatorConstraint()
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return cnpj.isValid(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return "CNPJ is invalid! Only numbers Ex.: 11111111111";
  }
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint,
    });
  };
}
