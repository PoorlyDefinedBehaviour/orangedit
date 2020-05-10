import redis from "./Redis"

import PREFIXES from "../Config/Prefixes"
import User from "../Infra/Database/Entities/User"

const authenticator = {
  authenticate: (user: User) =>
    redis.set(`${PREFIXES.redis}@${user.id}`, user.id).then(() => user.id),
}

export default authenticator
