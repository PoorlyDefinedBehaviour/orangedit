import IEncrypter from "../Interfaces/IEncrypter"
import ICreateUserRepository from "../Interfaces/ICreateUserRepository"
import IUserDTO from "../Interfaces/ISignUpDTO"
import ICreateUserValidator from "../Interfaces/ICreateUserValidator"

interface IDependencies {
  encrypter: IEncrypter
  createUserRepository: ICreateUserRepository
  createUserValidator: ICreateUserValidator
}

const makeSignUseCase = ({
  encrypter,
  createUserRepository,
  createUserValidator,
}: IDependencies) => {
  const signUp = async (data: IUserDTO) => {
    await createUserValidator.validateOrFail(data)
    const saltRounds = 10
    data.password = await encrypter.hash(data.password, saltRounds)
    return createUserRepository.create(data)
  }

  return {
    signUp,
  }
}

export default makeSignUseCase
