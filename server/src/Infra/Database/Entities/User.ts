import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
  BeforeUpdate,
  BeforeInsert,
  Entity,
  BaseEntity,
} from "typeorm"
import { Field, ObjectType, ID } from "type-graphql"

@ObjectType("user")
@Entity("users")
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({ unique: true })
  email!: string

  @Field(() => String)
  @Column({})
  username!: string

  @Column()
  password!: string

  @Column({ nullable: true })
  temp_password: string

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date

  @AfterLoad()
  // @ts-ignore
  private loadTempPassword(): void {
    this.temp_password = this.password
  }

  private hashPassword(password: string) {
    const SALT_ROUNDS = 10
    return hash(password, SALT_ROUNDS)
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await this.hashPassword(this.password)
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.temp_password !== this.password) {
      this.password = await this.hashPassword(this.password)
    }
  }

  isCorrectPassword(password: string) {
    return compare(password, this.password)
  }
}
