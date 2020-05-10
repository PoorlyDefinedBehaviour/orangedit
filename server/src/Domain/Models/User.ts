import Role from "./Role"

type User = {
  email: string
  username: string
  password: string
  roles: Role[]
}

export default User
