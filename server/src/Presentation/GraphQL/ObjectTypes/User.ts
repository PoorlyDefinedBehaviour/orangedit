import { Field, ObjectType, ID } from "type-graphql"

import Role from "./Role"
import ExtendedEntity from "../../../Infra/Database/Entities/ExtendedEntity"

@ObjectType("User")
class User extends ExtendedEntity {
  @Field(() => ID)
  id!: number

  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  password!: string

  @Field(() => Date)
  created_at!: Date

  @Field(() => Date)
  updated_at!: Date

  @Field(() => [Role])
  roles: Role[]

  public static of(data: { id: number; email: string; username: string }) {
    const user = new User()

    user.id = data.id
    user.email = data.email
    user.username = data.username

    return user
  }
}

export default User
