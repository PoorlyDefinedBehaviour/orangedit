import makeSignUpUseCase from "../Domain/UseCases/User/SignUp/SignUpUseCase"
import Encrypter from "../Support/Encrypter"
import UserValidatorComposer from "./UserValidatorComposer"
import UserRepositoryComposer from "./UserRepositoryComposer"

const UserValidator = UserValidatorComposer.compose()
const UserRepository = UserRepositoryComposer.compose()

const composer = {
  compose: () =>
    makeSignUpUseCase({
      Encrypter,
      UserValidator,
      UserRepository,
    }),
}
export default composer
