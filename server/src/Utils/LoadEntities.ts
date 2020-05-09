import { readdirSync } from "fs"
import { join } from "path"

export default function loadEntities() {
  const path = join(__dirname, "..", "Infra", "Database", "Entities")

  return readdirSync(path).map(name => require(join(path, name)).default)
}
