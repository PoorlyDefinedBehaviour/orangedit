import User from "../../../Models/User"
import Result from "folktale/result"
import Maybe from "folktale/maybe"
import MaybeT from "../../../../types/Maybe"

interface IUserRepository {
  findOne: (query: object) => Promise<MaybeT<User>>
}

interface IEncrypter {
  compare: (value: string, hash: string) => Promise<boolean>
}

interface IAuthenticator {
  authenticate(user: User): Promise<string | number>
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
  execute: (data: Omit<User, "id" | "username">) =>
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
