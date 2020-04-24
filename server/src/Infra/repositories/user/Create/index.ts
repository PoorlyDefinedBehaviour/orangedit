import ICreateUserRepository from "../../../../domain/UseCases/user/interfaces/ICreateUserRepository"
import ISignUpDTO from "../../../../domain/UseCases/user/interfaces/ISignUpDTO"
import User from "../../../Database/entities/User"

const createUserRepository: ICreateUserRepository = {
  create: (data: ISignUpDTO) => User.create(data).save(),
}

export default createUserRepository
