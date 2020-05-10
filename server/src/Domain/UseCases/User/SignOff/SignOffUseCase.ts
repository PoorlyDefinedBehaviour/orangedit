interface IAuthenticator {
  unauthorize: (authToken: number | string) => Promise<void>
}

interface IDependencies {
  Authenticator: IAuthenticator
}

const makeSignOffUsecase = ({ Authenticator }: IDependencies) => ({
  execute: Authenticator.unauthorize,
})

export default makeSignOffUsecase
