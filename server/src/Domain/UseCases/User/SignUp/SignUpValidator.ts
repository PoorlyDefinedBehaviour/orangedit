import User from "../../../Models/User"
import IValidationError from "../../../Interfaces/IValidationError"

interface IUserRepository {
  create: (data: User) => Promise<any>
  findOne: (query: object) => Promise<any>
}

interface IDependencies {
  UserRepository: IUserRepository
}

const makeValidationError = (error: IValidationError) => Promise.reject(error)

const makeSignUpValidator = ({ UserRepository }: IDependencies) => ({
  async validate(data: User) {
    const userExists = await UserRepository.findOne({ email: data.email }).then(
      Boolean
    )
    if (userExists) {
      return makeValidationError({
        message: "email already in use",
        constraint: "unique",
        field: "email",
      })
    }
  },
})

export default makeSignUpValidator
