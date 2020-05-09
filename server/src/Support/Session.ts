import expressSession from "express-session"
import connectRedis from "connect-redis"
import redis from "./Redis"
import PREFIXES from "../Config/Prefixes"
import env from "../Config/Env"

const Store = connectRedis(expressSession)

const session = expressSession({
  store: new Store({
    client: redis,
    prefix: PREFIXES.redis,
  }),
  name: "sid",
  secret: env.APP_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: env.NODE_ENV === "prod",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
})

export default session
