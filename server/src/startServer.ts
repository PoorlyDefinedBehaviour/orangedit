import "reflect-metadata"
import load from "process-env-loader"
import { Server } from "http"
import express from "express"
import cors from "cors"
import { createConnection, getConnectionOptions } from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import session from "express-session"
import env from "./Config/Env"
import rateLimiter from "./Support/RateLimiter"
import redis from "./Support/Redis"
import loadResolvers from "./Utils/LoadResolvers"

load()

interface ServerStartResult {
  server: Server
  port: number | string
}

const startServer = async (): Promise<ServerStartResult> => {
  const isProductionEnv = /prod/gi.test(env.NODE_ENV)

  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(rateLimiter)
  app.use(session)

  const connectionOptions = await getConnectionOptions(env.NODE_ENV)

  const [schema] = await Promise.all([
    buildSchema({
      resolvers: loadResolvers(),
    }),
    createConnection({
      ...connectionOptions,
      name: "default",
    }),
  ])

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redis }),
    debug: !isProductionEnv,
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const port = env.PORT
  return { server: app.listen(port, () => {}), port }
}

export default startServer
