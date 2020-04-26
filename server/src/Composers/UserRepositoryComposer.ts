import makeUserRepository from "../Repositores/UserRepository"
import User from "../Infra/Database/Entities/User"

const composer = {
  compose: () => makeUserRepository(User),
}

export default composer
