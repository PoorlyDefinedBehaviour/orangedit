import {
  Resolver,
  Mutation,
  Arg,
  Query,
  createUnionType,
  Ctx,
} from "type-graphql"

import UserObjectType from "../ObjectTypes/User"
import SignUpInput from "../Inputs/User/CreateUserInput"

import SignUpUseCaseComposer from "../../../Composers/SignUpUseCaseComposer"
import SignInUseCaseComposer from "../../../Composers/SignInUseCaseComposer"
import SignOffUseCaseComposer from "../../../Composers/SignOffUseCaseComposer"
import SignUpValidationErrorObjectType from "../ObjectTypes/SignUpValidationError"
import GenericErrorObjectType from "../ObjectTypes/GenericError"
import SignInInput from "../Inputs/User/SignInInput"

const SignUpUseCase = SignUpUseCaseComposer.compose()
const SignInUseCase = SignInUseCaseComposer.compose()
const SignOffUseCase = SignOffUseCaseComposer.compose()

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
  signIn(@Arg("data") data: SignInInput, @Ctx() { req, redis }) {
    return SignInUseCase.execute(data).then(result =>
      result.matchWith({
        Error: ({ value }) => [
          GenericErrorObjectType.of({
            message: value,
            code: "UNAUTHORIZED_ERROR",
          }),
        ],
        Ok: ({ value: [user, authResult] }) => {
          req.session.auth = authResult

          return [UserObjectType.of(user)]
        },
      })
    )
  }

  @Mutation(() => Boolean)
  signOff(@Ctx() { req }) {
    return SignOffUseCase.execute(req.session.auth)
      .then(() => true)
      .catch(() => false)
  }

  @Query(() => String)
  foo() {
    return "hello world"
  }
}

export default UserResolver
