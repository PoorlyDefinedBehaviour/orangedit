import User from "../../../Models/User"
import Result from "folktale/result"

export type SignUpUser = Omit<User, "roles">

interface IUserRepository {
  create: (data: SignUpUser) => Promise<any>
  findOne: (query: object) => Promise<any>
}

interface SignUpUseCaseValidator {
  validate: (data: SignUpUser) => Promise<any>
}

interface IEncrypter {
  hash: (value: string, saltRounds: number) => Promise<string>
}

interface IDependencies {
  UserRepository: IUserRepository
  SignUpUseCaseValidator: SignUpUseCaseValidator
  Encrypter: IEncrypter
}

const makeSignUpUseCase = ({
  UserRepository,
  SignUpUseCaseValidator,
  Encrypter,
}: IDependencies) => ({
  execute: (data: SignUpUser) =>
    SignUpUseCaseValidator.validate(data).then(validationResult =>
      validationResult.matchWith({
        Failure: ({ value }) => Result.Error(value),
        Success: () =>
          Encrypter.hash(data.password, 10)
            .then(password => UserRepository.create({ ...data, password }))
            .then(Result.Ok),
      })
    ),
})

export default makeSignUpUseCase
