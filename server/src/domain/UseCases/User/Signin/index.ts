import IEncrypter from "../Interfaces/IEncrypter"
import IFindUserByUsernameRepository from "../Interfaces/IFindUserByusernameRepository"
import ISignInDTO from "../Interfaces/ISignInDTO"
import UnauthorizedError from "../Exceptions/UnauthorizedError"

interface IDependencies {
  encrypter: IEncrypter
  findUserByUsernameRepository: IFindUserByUsernameRepository
}

const makeSignInUseCase = ({
  encrypter,
  findUserByUsernameRepository,
}: IDependencies) => {
  const signIn = async (data: ISignInDTO) => {
    const user = await findUserByUsernameRepository.findOrFail(data.username)
    const isPasswordCorrect = await encrypter.compare(
      user?.password,
      data.password
    )

    if (!isPasswordCorrect) {
      throw new UnauthorizedError()
    }

    return user
  }

  return {
    signIn,
  }
}

export default makeSignInUseCase
