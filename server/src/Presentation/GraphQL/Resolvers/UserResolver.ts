import { Resolver, Mutation, Arg, Query, createUnionType } from "type-graphql"

import UserObjectType from "../ObjectTypes/User"
import SignUpInput from "../Inputs/User/CreateUserInput"

import SignUpUseCaseComposer from "../../../Composers/SignUpUseCaseComposer"
import SignInUseCaseComposer from "../../../Composers/SignInUseCaseComposer"
import SignUpValidationErrorObjectType from "../ObjectTypes/SignUpValidationError"
import GenericErrorObjectType from "../ObjectTypes/GenericError"
import SignInInput from "../Inputs/User/SignInInput"

const SignUpUseCase = SignUpUseCaseComposer.compose()
const SignInUseCase = SignInUseCaseComposer.compose()

const SignUpResult = createUnionType({
  name: "SignUpResult",
  types: () => [SignUpValidationErrorObjectType, UserObjectType],
})

const SignInResult = createUnionType({
  name: "SignInResult",
  types: () => [GenericErrorObjectType, UserObjectType],
})

@Resolver(() => UserObjectType)
class UserResolver {
  @Mutation(() => [SignUpResult])
  signUp(@Arg("data") data: SignUpInput) {
    return SignUpUseCase.execute(data).then(result =>
      result.matchWith({
        Error: ({ value }) => value.map(SignUpValidationErrorObjectType.of),
        Ok: ({ value }) => [UserObjectType.of(value)],
      })
    )
  }

  @Mutation(() => [SignInResult])
  signIn(@Arg("data") data: SignInInput) {
    return SignInUseCase.execute(data).then(result =>
      result.matchWith({
        Error: ({ value }) => [
          GenericErrorObjectType.of({
            message: value,
            code: "UNAUTHORIZED_ERROR",
          }),
        ],
        Ok: ({ value }) => [UserObjectType.of(value)],
      })
    )
  }

  @Query(() => String)
  foo() {
    return "hello world"
  }
}

export default UserResolver
