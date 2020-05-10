import makeSignInUseCase from "./SignInUseCase"

describe("SignInUseCase test suite", () => {
  test("returns Result.Error if user is not found by email", async () => {
    const signInUseCase = makeSignInUseCase({
      Encrypter: { compare: (hash, value) => Promise.resolve(hash === value) },
      UserRepository: { findOne: _ => Promise.resolve(null) },
      Authenticator: { authenticate: user => Promise.resolve(1) },
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
            id: 1,
            username: "johndoe",
            email: "johndoe@email.com",
            password: "password123",
          }),
      },
      Authenticator: { authenticate: user => Promise.resolve(1) },
    })

    const result = await signInUseCase.execute({
      email: "johndoe@email.com",
      password: "123456",
    })

    expect(result.value).toBe("Invalid credentials")
  })

  test("returns Result.Ok(user, authResult) if user is found and password matches", async () => {
    const user = {
      id: 1,
      username: "johndoe",
      email: "johndoe@email.com",
      password: "password123",
    }

    const authResult = 1

    const signInUseCase = makeSignInUseCase({
      Encrypter: { compare: (hash, value) => Promise.resolve(hash === value) },
      UserRepository: {
        findOne: query => Promise.resolve(user),
      },
      Authenticator: { authenticate: user => Promise.resolve(authResult) },
    })

    const result = await signInUseCase.execute({
      email: "johndoe@email.com",
      password: "password123",
    })

    expect(result.value).toEqual([user, authResult])
  })

  test("Uses authenticator to authenticate user, it could be jwt/session or whatever", async () => {
    const user = {
      id: 1,
      username: "johndoe",
      email: "johndoe@email.com",
      password: "password123",
    }

    const result1 = await makeSignInUseCase({
      Encrypter: { compare: (hash, value) => Promise.resolve(hash === value) },
      UserRepository: { findOne: _ => Promise.resolve(user) },
      Authenticator: { authenticate: user => Promise.resolve(1) },
    }).execute(user)

    const result2 = await makeSignInUseCase({
      Encrypter: { compare: (hash, value) => Promise.resolve(hash === value) },
      UserRepository: { findOne: _ => Promise.resolve(user) },
      Authenticator: { authenticate: user => Promise.resolve("hello world") },
    }).execute(user)

    expect(result1.value[1]).toBe(1)

    expect(result2.value[1]).toBe("hello world")
  })
})
