import { readdirSync } from "fs"
import { join } from "path"

export default function loadResolvers() {
  const path = join(__dirname, "..", "Presentation", "GraphQL", "Resolvers")
  return readdirSync(path).map(name => require(join(path, name)))
}
