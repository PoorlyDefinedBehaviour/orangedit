import User from "../Infra/Database/Entities/User"

const UserRepository = {
  create: (data: object) => User.create(data).save(),
  findOne: (query: object) => User.findOne(query),
}

export default UserRepository
