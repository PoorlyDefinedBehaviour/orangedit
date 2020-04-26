import bcrypt from "bcryptjs"

const Encrypter = {
  hash: bcrypt.hash,
  compare: bcrypt.compare,
}

export default Encrypter
