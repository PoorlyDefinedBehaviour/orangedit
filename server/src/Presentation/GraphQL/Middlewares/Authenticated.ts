import { ResolverData, NextFn, UnauthorizedError } from "type-graphql"
import User from "../ObjectTypes/User"

export default class Authenticated {
  async use({ context }: ResolverData<any>, next: NextFn) {
    const userId = await context.redis.get(context.req.headers.authorization)
    if (!userId) {
      throw new UnauthorizedError()
    }

    context.user = await User.findOne({ id: userId })

    return next()
  }
}
