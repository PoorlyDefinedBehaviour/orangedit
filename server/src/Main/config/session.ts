import expressSession from "express-session"
import connectRedis from "connect-redis"
import env from "./env"
import redis from "./redis"
import PREFIXES from "./prefixes"

const Store = connectRedis(expressSession)

const session = expressSession({
  store: new Store({
    client: redis,
    prefix: PREFIXES.redis,
  }),
  name: "sid",
  secret: env.APP_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "prod",
    maxAge: 1000 * 60 * 60 * 24, // 1day
  },
})

export default session
