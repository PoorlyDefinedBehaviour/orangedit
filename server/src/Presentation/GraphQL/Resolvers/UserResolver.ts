import { Resolver, Mutation, Arg, Query, createUnionType } from "type-graphql"

import UserObjectType from "../ObjectTypes/User"
import SignUpInput from "../Inputs/User/CreateUserInput"

import SignUpUseCaseComposer from "../../../Composers/SignUpUseCaseComposer"
import SignUpValidationErrorObjectType from "../ObjectTypes/SignUpValidationError"

const SignUpUseCase = SignUpUseCaseComposer.compose()

const SignUpResult = createUnionType({
  name: "SignUpResult",
  types: () => [SignUpValidationErrorObjectType, UserObjectType],
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

  @Query(() => String)
  foo() {
    return "hello world"
  }
  yarn
}

export default UserResolver
