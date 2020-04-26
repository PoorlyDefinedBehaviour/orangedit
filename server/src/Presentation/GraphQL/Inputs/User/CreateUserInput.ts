import { InputType, Field } from "type-graphql"

import {
  IsEmail,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsNumberString,
  IsBoolean,
} from "class-validator"
import Unique from "../Validators/Unique"
import User from "../../ObjectTypes/User"

@InputType()
class SignUpInput {
  @IsNotEmpty({ message: "An email is required" })
  @IsEmail({}, { message: "Email must be a valid email" })
  @MaxLength(255, { message: "Email can't be longer than 255 characters" })
  @Unique(
    { field: "email", repository: User },
    { message: "Email is already in use" }
  )
  @Field(() => String, { nullable: false })
  email!: string

  @IsNotEmpty({ message: "An username is required" })
  @MaxLength(255, { message: "Username can't be longer than 255 characters" })
  @Field(() => String, { nullable: false })
  username!: string

  @MinLength(6, { message: "Password needs to be at least 6 characters long" })
  @MaxLength(255, { message: "Password can't be longer than 255 characters" })
  @Field(() => String, { nullable: false })
  password!: string
}

export default SignUpInput
