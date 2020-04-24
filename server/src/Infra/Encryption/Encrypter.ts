import { hash, compare } from "bcryptjs"
import IEncrypter from "../../domain/UseCases/user/interfaces/IEncrypter"

const encrypter: IEncrypter = {
  hash: (value: string, saltRounds: number) => hash(value, saltRounds),
  compare: (hash: string, value: string) => compare(hash, value),
}

export default encrypter
