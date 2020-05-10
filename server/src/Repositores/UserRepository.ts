import UserEntity from "../Infra/Database/Entities/User"
import UserModel from "../Domain/Models/User"

const toDomainModel = (user: UserEntity): UserModel => ({
  email: user.email,
  username: user.username,
  password: user.password,
})

const UserRepository = {
  create: (data: object) => UserEntity.create(data).save().then(toDomainModel),
  findOne: (query: object) => UserEntity.findOne(query),
}

export default UserRepository
