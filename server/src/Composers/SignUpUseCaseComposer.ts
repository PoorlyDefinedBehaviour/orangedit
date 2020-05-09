import makeSignUpUseCase from "../Domain/UseCases/User/SignUp/SignUpUseCase"
import Encrypter from "../Support/Encrypter"
import SignUpUseCaseValidatorComposer from "./SignUpUseCaseValidatorComposer"
import UserRepository from "../Repositores/UserRepository"

const SignUpUseCaseValidator = SignUpUseCaseValidatorComposer.compose()

const composer = {
  compose: () =>
    makeSignUpUseCase({
      Encrypter,
      SignUpUseCaseValidator,
      UserRepository,
    }),
}
export default composer
