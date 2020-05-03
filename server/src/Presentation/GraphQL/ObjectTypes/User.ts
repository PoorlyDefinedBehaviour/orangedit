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
  password!: string

  @Field(() => Date)
  created_at!: Date

  @Field(() => Date)
  updated_at!: Date

  @Field(() => [Role])
  roles: Role[]
}

export default User
