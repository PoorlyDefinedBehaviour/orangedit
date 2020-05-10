import Encrypter from "../Support/Encrypter"
import UserRepository from "../Repositores/UserRepository"
import makeSignInUseCase from "../Domain/UseCases/User/SignIn/SignInUseCase"
import Authenticator from "../Support/SessionAuthenticator"

const composer = {
  compose: () =>
    makeSignInUseCase({
      Encrypter,
      UserRepository,
      Authenticator,
    }),
}
export default composer
