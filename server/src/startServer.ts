import "reflect-metadata"
import load from "process-env-loader"
load()
import { Server } from "http"
import express from "express"
import cors from "cors"
import {
  createConnection,
  getConnectionOptions,
  ConnectionOptions,
} from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import loadResolvers from "./Main/utils/LoadResolvers"
import rateLimiter from "./Main/config/ratelimiter"
import session from "./Main/config/session"
import redis from "./Main/config/redis"
import env from "./Main/config/env"

interface ServerStartResult {
  server: Server
  port: number | string
}

const startServer = async (): Promise<ServerStartResult> => {
  const isProductionEnv = /prod/gi.test(process.env.NODE_ENV!)

  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(rateLimiter)
  app.use(session)

  // move ormConfigs to a file later
  const connectionOptions = ormConfigs["dev"]

  await createConnection({
    ...connectionOptions,
    name: "default",
  } as ConnectionOptions)

  const schema = await buildSchema({
    resolvers: loadResolvers(),
  })

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
