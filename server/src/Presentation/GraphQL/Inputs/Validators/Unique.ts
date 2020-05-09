import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator"

import R from "ramda"

interface UniqueProperty<T> {
  field: string
  repository: T
}

const Unique = <T>(
  property: UniqueProperty<T>,
  validationOptions?: ValidationOptions
) => {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "unique",
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      async: true,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { field, repository } = args.constraints[0]

          return repository
            .findOne({ [field]: value })
            .then(Boolean)
            .then(R.not)
        },
      },
    })
  }
}

export default Unique
