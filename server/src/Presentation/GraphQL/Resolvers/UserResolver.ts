import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  UseMiddleware,
} from "type-graphql"

import User from "../ObjectTypes/User"

import SignUpInput from "../Inputs/User/CreateUserInput"

import SignUpUseCaseComposer from "../../../Composers/SignUpUseCaseComposer"
const SignUpUseCase = SignUpUseCaseComposer.compose()

@Resolver(() => User)
export default class UserResolver {
  @Mutation(() => User)
  signUp(@Arg("data") data: SignUpInput) {
    return SignUpUseCase.signUp(data)
  }
}
