import ISignUpDTO from "./ISignUpDTO"
import User from "../../../models/User"

interface ICreateUserRepository {
  create: (data: ISignUpDTO) => Promise<User>
}

export default ICreateUserRepository
