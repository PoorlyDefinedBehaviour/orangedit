import makeSignUpUseCaseValidator from "../Domain/UseCases/User/SignUp/SignUpUseCaseValidator"
import UserRepository from "../Repositores/UserRepository"

const composer = {
  compose: () =>
    makeSignUpUseCaseValidator({
      UserRepository,
    }),
}

export default composer
