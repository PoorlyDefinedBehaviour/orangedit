interface IUser {
  create: (data: object) => Promise<any>
}

const makeUserRepository = (user: IUser) => ({
  create: user.create,
  findOne: user.findOne,
})

export default makeUserRepository
