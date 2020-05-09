import makeSignInUseCase from "./SignInUseCase"

describe("SignInUseCase test suite", () => {
  test("returns Result.Error if user is not found by email", async () => {
    const signInUseCase = makeSignInUseCase({
      Encrypter: { compare: (hash, value) => Promise.resolve(hash === value) },
      UserRepository: { findOne: _ => Promise.resolve(null) },
    })

    const result = await signInUseCase.execute({
      email: "non_existent_email@email.com",
      password: "123456",
    })

    expect(result.value).toBe("Invalid credentials")
  })

  test("returns Result.Error if user is found but password doesn't match", async () => {
    const signInUseCase = makeSignInUseCase({
      Encrypter: { compare: (hash, value) => Promise.resolve(hash === value) },
      UserRepository: {
        findOne: _ =>
          Promise.resolve({
            email: "johndoe@email.com",
            password: "password123",
          }),
      },
    })

    const result = await signInUseCase.execute({
      email: "johndoe@email.com",
      password: "123456",
    })

    expect(result.value).toBe("Invalid credentials")
  })

  test("returns Result.Ok if user is found and password matches", async () => {
    const user = {
      email: "johndoe@email.com",
      password: "password123",
    }

    const signInUseCase = makeSignInUseCase({
      Encrypter: { compare: (hash, value) => Promise.resolve(hash === value) },
      UserRepository: {
        findOne: query => Promise.resolve(user),
      },
    })

    const result = await signInUseCase.execute({
      email: "johndoe@email.com",
      password: "password123",
    })

    expect(result.value).toEqual(user)
  })
})
