import { Field, ObjectType } from "type-graphql"

@ObjectType("SignUpValidationError")
class SignUpValidationError {
  id!: number

  @Field(() => String)
  message!: string

  @Field(() => String)
  constraint!: string

  @Field(() => Date)
  field!: Date
}

export default SignUpValidationError
