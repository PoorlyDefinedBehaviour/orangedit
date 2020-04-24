import Maybe from "../../../../typings/Maybe"
import User from "../../../models/User"

interface IFindUserByEmailRepository {
  findOne: (email: string) => Promise<Maybe<User>>
  findOrFail: (email: string) => Promise<User> | never
}

export default IFindUserByEmailRepository
