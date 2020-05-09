import Encrypter from "./Encrypter"

describe("Encrypter test suite", () => {
  test("hash@ hashes a value based on salt round", async () => {
    const testValue = "hello world"

    const saltRounds = 10

    const result = await Encrypter.hash(testValue, saltRounds)

    expect(result).not.toBe(testValue)
  })

  test("compare@ returns false if hash and value are different", async () => {
    const result = await Encrypter.compare("123", "456")

    expect(result).toBe(false)
  })

  test("compare@ returns true if hash and value are equal", async () => {
    const testValue = "123"

    const saltRounds = 10

    const hash = await Encrypter.hash(testValue, saltRounds)

    const result = await Encrypter.compare(testValue, hash)

    expect(result).toBe(true)
  })
})
