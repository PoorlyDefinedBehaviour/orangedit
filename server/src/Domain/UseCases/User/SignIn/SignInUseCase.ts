import User from "../../../Models/User"
import Result from "folktale/result"
import Maybe from "folktale/maybe"

interface IUserRepository {
  findOne: (query: object) => Promise<any>
}

interface IEncrypter {
  compare: (value: string, hash: string) => Promise<boolean>
}

interface IDependencies {
  UserRepository: IUserRepository
  Encrypter: IEncrypter
}

const makeSignInUseCase = ({ UserRepository, Encrypter }: IDependencies) => ({
  execute: (data: Omit<User, "username">) =>
    UserRepository.findOne({ email: data.email })
      .then(Maybe.fromNullable)
      .then(user =>
        user.matchWith({
          Nothing: () => Result.Error("Invalid credentials"),
          Just: ({ value }) =>
            Encrypter.compare(
              data.password,
              value.password
            ).then(passwordIsCorrect =>
              passwordIsCorrect
                ? Result.Ok(value)
                : Result.Error("Invalid credentials")
            ),
        })
      ),
})

export default makeSignInUseCase
