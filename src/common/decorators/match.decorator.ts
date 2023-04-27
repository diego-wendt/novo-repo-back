import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function Match(property: Array<string>, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: property,
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: Array<string>, args: ValidationArguments) {
        const [relatedPropertyName, action] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        if (action === "equals") {
            return value === relatedValue;
        } else if (action === "different") {
            return value !== relatedValue;
        }
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        const [field, action] = validationArguments.constraints
        if (action === "equals") {
            return "Passwords do not match: " + field;
        } else if (action === "different") {
            return "Passwords must be different: " + field;
        }

    }

}