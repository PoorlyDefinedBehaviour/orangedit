import User from "../../../Models/User"
import Result from "folktale/result"
import Maybe from "folktale/maybe"
import MaybeT from "../../../../types/Maybe"

type SignInUser = Omit<User, "username" | "roles">

interface IUserRepository {
  findOne: (
    query: object
  ) => Promise<MaybeT<SignInUser & { id: number | string }>>
}

interface IEncrypter {
  compare: (value: string, hash: string) => Promise<boolean>
}

interface IAuthenticator {
  authenticate(user: SignInUser): Promise<string | number>
}

interface IDependencies {
  UserRepository: IUserRepository
  Encrypter: IEncrypter
  Authenticator: IAuthenticator
}

const makeSignInUseCase = ({
  UserRepository,
  Encrypter,
  Authenticator,
}: IDependencies) => ({
  execute: (data: SignInUser) =>
    UserRepository.findOne({ email: data.email })
      .then(user => Maybe.fromNullable(user!))
      .then(maybeUser => {
        const invalidCredentials = Result.Error("Invalid credentials")

        return maybeUser.matchWith({
          Nothing: () => invalidCredentials,
          Just: ({ value }) =>
            Encrypter.compare(
              data.password,
              value.password
            ).then(isPasswordCorrect =>
              isPasswordCorrect
                ? Authenticator.authenticate(value).then(authResult =>
                    Result.Ok([value, authResult])
                  )
                : invalidCredentials
            ),
        })
      }),
})

export default makeSignInUseCase
