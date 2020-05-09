import { Field, ObjectType } from "type-graphql"

@ObjectType("SignUpValidationError")
class SignUpValidationError {
  @Field(() => String)
  message!: string

  @Field(() => String)
  constraint!: string

  @Field(() => String)
  field!: string

  public static of(data: {
    message: string
    constraint: string
    field: string
  }) {
    const error = new SignUpValidationError()

    error.message = data.message
    error.constraint = data.constraint
    error.field = data.field

    return error
  }
}

export default SignUpValidationError
