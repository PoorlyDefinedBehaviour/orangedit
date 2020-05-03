import makeSignUpValidator from "../Domain/UseCases/User/SignUp/SignUpUseCaseValidator"
import UserRepositoryComposer from "./UserRepositoryComposer"

const UserRepository = UserRepositoryComposer.compose()

const composer = {
  compose: () =>
    makeSignUpValidator({
      UserRepository,
    }),
}

export default composer
