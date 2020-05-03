import { PrimaryGeneratedColumn, Column, ManyToMany, Entity } from "typeorm"

import User from "./User"
import ExtendedEntity from "./ExtendedEntity"

@Entity("roles")
class Role extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  description!: string

  @ManyToMany(() => User, user => user.roles)
  users: User[]
}

export default Role
