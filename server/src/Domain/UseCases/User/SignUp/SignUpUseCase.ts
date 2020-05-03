import User from "../../../Models/User"
import S from "../../../../Config/Sanctuary"

interface IUserRepository {
  create: (data: User) => Promise<any>
  findOne: (query: object) => Promise<any>
}

interface IUserValidator {
  validate: (data: User) => Promise<typeof S.Either>
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
      .then(S.chain((): Promise<string> => Encrypter.hash(data.password, 10)))
      .then((password: string) => UserRepository.create({ ...data, password })),
})

export default makeSignUpUseCase
