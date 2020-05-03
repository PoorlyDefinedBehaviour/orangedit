import { PrimaryGeneratedColumn, Column, ManyToMany, Entity } from "typeorm"
import { Field, ObjectType, ID } from "type-graphql"

import User from "./User"
import ExtendedEntity from "../../../Infra/Database/Entities/ExtendedEntity"

@ObjectType("Uole")
class Role extends ExtendedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column()
  description!: string

  @Field(() => [User])
  @ManyToMany(() => User, user => user.roles)
  users: User[]
}

export default Role
