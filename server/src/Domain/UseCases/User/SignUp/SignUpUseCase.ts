import User from "../../../Models/User"
import Result from "folktale/result"

interface IUserRepository {
  create: (data: User) => Promise<any>
  findOne: (query: object) => Promise<any>
}

interface SignUpUseCaseValidator {
  validate: (data: User) => Promise<any>
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
  execute: (data: User) =>
    SignUpUseCaseValidator.validate(data).then(validationResult =>
      validationResult.matchWith({
        Failure: errors => Result.Error(errors.merge()),
        Success: () =>
          Encrypter.hash(data.password, 10)
            .then(password => UserRepository.create({ ...data, password }))
            .then(Result.Ok),
      })
    ),
})

export default makeSignUpUseCase
