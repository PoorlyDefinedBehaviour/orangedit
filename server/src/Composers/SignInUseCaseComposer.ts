import Encrypter from "../Support/Encrypter"
import UserRepository from "../Repositores/UserRepository"
import makeSignInUseCase from "../Domain/UseCases/User/SignIn/SignInUseCase"

const composer = {
  compose: () =>
    makeSignInUseCase({
      Encrypter,
      UserRepository,
    }),
}
export default composer
