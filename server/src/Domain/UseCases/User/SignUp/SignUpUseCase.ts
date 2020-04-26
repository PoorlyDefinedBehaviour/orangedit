import User from "../../../Models/User"
import IValidationError from "../../../Interfaces/IValidationError"

interface IUserRepository {
  create: (data: User) => Promise<any>
  findOne: (query: object) => Promise<any>
}

interface IUserValidator {
  validate: (data: User) => Promise<void>
}

interface IEncrypter {
  hash: (value: string, saltRounds: number) => Promise<string>
}

interface IDependencies {
  UserRepository: IUserRepository
  UserValidator: IUserValidator
  Encrypter: IEncrypter
}

const makeSignUpUseCase = ({
  UserRepository,
  UserValidator,
  Encrypter,
}: IDependencies) => ({
  signUp: (data: User) =>
    UserValidator.validate(data)
      .then(() => Encrypter.hash(data.password, 10))
      .then(password => UserRepository.create({ ...data, password })),
})

export default makeSignUpUseCase
