import bcrypt from "bcryptjs"

const Encrypter = {
  hash: bcrypt.hash,
  compare: (value: string, hash: string) => bcrypt.compare(value, hash),
}

export default Encrypter
