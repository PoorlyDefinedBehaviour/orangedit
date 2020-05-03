import { Resolver, Mutation, Arg, Query, createUnionType } from "type-graphql"

import User from "../ObjectTypes/User"
import SignUpInput from "../Inputs/User/CreateUserInput"
import S from "../../../Config/Sanctuary"

import SignUpUseCaseComposer from "../../../Composers/SignUpUseCaseComposer"
import SignUpValidationError from "../ObjectTypes/SignUpValidationError"
import IValidationError from "../../../Domain/Interfaces/IValidationError"

const SignUpUseCase = SignUpUseCaseComposer.compose()

const SignUpResult = createUnionType({
  name: "SignUpResult",
  types: () => [String, Number],
})

@Resolver(() => User)
export default class UserResolver {
  @Mutation(() => SignUpResult)
  signUp(@Arg("data") data: SignUpInput) {
    return SignUpUseCase.signUp(data).then(
      S.either((validationError: IValidationError) => validationError)(
        (user: User) => user
      )
    )
  }

  @Query(() => String)
  foo() {
    return "hello world"
  }
}
