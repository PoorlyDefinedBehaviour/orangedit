import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Entity,
} from "typeorm"

import ExtendedEntity from "./ExtendedEntity"
import Role from "./Role"

@Entity("users")
class User extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  first_name!: string

  @Column()
  last_name!: string

  @Column({ unique: true })
  email!: string

  @Column()
  phone!: string

  @Column()
  receive_notifications!: boolean

  @Column()
  password!: string

  @Column({ nullable: true })
  temp_password: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @ManyToMany(() => Role, (role: Role) => role.users)
  roles: Role[]
}

export default User
