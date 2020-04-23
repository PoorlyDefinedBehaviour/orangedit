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
import loadResolvers from "./main/utils/LoadResolvers"
import rateLimiter from "./main/config/ratelimiter"
import session from "./main/config/session"
import redis from "./main/config/redis"
import env from "./main/config/env"

interface ServerStartResult {
  server: Server
  port: number | string
}

const ormConfigs = {
  dev: {
    name: "dev",
    type: "mysql",
    port: 3306,
    database: "orangedit_dev",
    user: "user",
    password: "password",
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
  test: {
    name: "test",
    type: "mysql",
    port: 3306,
    database: "orangedit_test",
    user: "user",
    password: "password",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
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
