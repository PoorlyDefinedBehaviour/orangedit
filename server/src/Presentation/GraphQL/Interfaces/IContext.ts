import { Redis } from "ioredis"
import User from "../ObjectTypes/User"

interface IContext {
  redis: Redis
  user: User
}

export default IContext
