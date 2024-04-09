import {
  IsIn,
  IsNotEmpty,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { IncorporationLLCSCMachine } from '../state-machines/incorporation-llc-sc/incorporation-llc-sc.machine';

const events = new IncorporationLLCSCMachine().events;
const eventNames = events.map((event) => event.name);

@ValidatorConstraint({ async: true })
class CustomNestedValidator implements ValidatorConstraintInterface {
  validate(propertyValues: Record<string, any>, args: ValidationArguments) {
    if (!propertyValues) return false;
    if (typeof propertyValues !== 'object') return false;
    const validEvent = events.find((e) => e.name === (args.object as any).name);
    const validParams = (validEvent || {})?.params || {};
    let valid = true;

    const hasMissingKey = !Object.keys(validParams).every(
      (k) => propertyValues[k],
    );
    if (hasMissingKey) valid = false;

    const hasWrongKey = Object.keys(propertyValues).find(
      (pV) => !validParams[pV],
    );
    if (hasWrongKey) valid = false;

    return valid;
  }

  defaultMessage(args: ValidationArguments) {
    const validEvent = events.find((e) => e.name === (args.object as any).name);
    const validParams = (validEvent || {})?.params || {};

    if (!args.value) return 'The event is missing the params object.';
    if (typeof args.value !== 'object')
      return 'The event params field should be an object.';

    const missingKeys = Object.keys(validParams).filter((k) => !args.value[k]);

    let message = '';

    if (missingKeys.length > 0) {
      message = `The params for event ${
        (args.object as any).name
      } are missing the following keys: ${missingKeys.join(', ')}`;
    }

    const wrongKeys = Object.keys(args.value).filter((pV) => !validParams[pV]);

    if (wrongKeys.length > 0) {
      message = `The params for event ${
        (args.object as any).name
      } may not contain the following keys: ${wrongKeys.join(', ')}`;
    }

    return message;
  }
}

function ValidateParams(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CustomNestedValidator,
    });
  };
}

export class SendEventDto {
  @IsNotEmpty()
  @IsIn(eventNames)
  readonly name: string;

  @ValidateParams()
  readonly params: Record<string, string>;
}
