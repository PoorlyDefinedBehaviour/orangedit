import Maybe from "../../../../typings/Maybe"
import User from "../../../models/User"

interface IFindUserByUsernameRepository {
  findOne: (username: string) => Promise<Maybe<User>>
  findOrFail: (username: string) => Promise<User> | never
}

export default IFindUserByUsernameRepository
