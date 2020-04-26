import makeSignUpValidator from "../Domain/UseCases/User/SignUp/SignUpValidator"
import UserRepositoryComposer from "./UserRepositoryComposer"

const UserRepository = UserRepositoryComposer.compose()

const composer = {
  compose: () =>
    makeSignUpValidator({
      UserRepository,
    }),
}

export default composer
