import "reflect-metadata"
import load from "process-env-loader"
load()
import { Server } from "http"
import express from "express"
import cors from "cors"
import { createConnection, getConnectionOptions } from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"

import env from "./Config/Env"
import rateLimiter from "./Support/RateLimiter"
import session from "./Support/Session"
import redis from "./Support/Redis"
import loadResolvers from "./Utils/LoadResolvers"
import loadEntities from "./Utils/LoadEntities"

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

  await createConnection({
    ...connectionOptions,
    name: "default",
    entities: loadEntities(),
  })

  const schema = await buildSchema({
    resolvers: loadResolvers(),
    emitSchemaFile: "./schema",
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, redis }),
    introspection: !isProductionEnv,
    debug: !isProductionEnv,
    playground: !isProductionEnv,
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const port = env.PORT
  return { server: app.listen(port, () => {}), port }
}

export default startServer
