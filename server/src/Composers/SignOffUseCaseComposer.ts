import makeSignOffUsecase from "../Domain/UseCases/User/SignOff/SignOffUseCase"
import Authenticator from "../Support/SessionAuthenticator"

const composer = {
  compose: () =>
    makeSignOffUsecase({
      Authenticator,
    }),
}

export default composer
