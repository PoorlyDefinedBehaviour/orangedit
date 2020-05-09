import { Field, ObjectType } from "type-graphql"

@ObjectType("GenericError")
class GenericErrorObjectType {
  @Field(() => String)
  message!: string

  @Field(() => String)
  code!: string

  public static of(data: { message: string; code: string }) {
    const error = new GenericErrorObjectType()

    error.message = data.message
    error.code = data.code

    return error
  }
}

export default GenericErrorObjectType
