import User from "../../../database/entities/User"
import IFindUserByEmailRepository from "../../../../domain/UseCases/user/interfaces/IFindUserByEmailRepository"

const findByUserEmailRepository: IFindUserByEmailRepository = {
  findOne: (email: string) => User.findOne({ where: { email } }),
  findOrFail: (email: string) => User.findOneOrFail({ where: { email } }),
}

export default findByUserEmailRepository
