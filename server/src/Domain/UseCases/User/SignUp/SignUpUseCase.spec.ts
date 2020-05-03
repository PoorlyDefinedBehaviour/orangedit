import makeSignUpUseCase from "./SignUpUseCase"
import makeSignUpValidator from "./SignUpUseCaseValidator"

describe("SignUpUseCase test suite", () => {
  test("doesn't create user if email is not a valid email", async () => {
    const Encrypter = {
      hash: (value: string, saltRounds: number) =>
        Promise.resolve(`${value}-${saltRounds}`),
    }

    const UserRepository = {
      findOne: () => Promise.resolve(null),
      create: data => Promise.resolve(data),
    }

    const SignUpUseCaseValidator = makeSignUpValidator({
      UserRepository,
    })

    const signUpUseCase = makeSignUpUseCase({
      Encrypter,
      SignUpUseCaseValidator,
      UserRepository,
    })

    const user = {
      username: "johndoe",
      email: "invalid_email",
      password: "password",
    }

    const result = await signUpUseCase.execute(user)

    expect(result.value[0]).toEqual({
      message: "Email must be valid",
      constraint: "email",
      field: "email",
    })
  })

  test("doesn't create user if username is too short", async () => {
    const Encrypter = {
      hash: (value: string, saltRounds: number) =>
        Promise.resolve(`${value}-${saltRounds}`),
    }

    const UserRepository = {
      findOne: () => Promise.resolve(null),
      create: data => Promise.resolve(data),
    }

    const SignUpUseCaseValidator = makeSignUpValidator({
      UserRepository,
    })

    const signUpUseCase = makeSignUpUseCase({
      Encrypter,
      SignUpUseCaseValidator,
      UserRepository,
    })

    const user = {
      username: "a",
      email: "valid_email@email.com",
      password: "password",
    }

    const result = await signUpUseCase.execute(user)

    expect(result.value[0]).toEqual({
      message: "Username must have at least 5 characters",
      constraint: "min",
      field: "username",
    })
  })

  test("doesn't create user if username is too long", async () => {
    const Encrypter = {
      hash: (value: string, saltRounds: number) =>
        Promise.resolve(`${value}-${saltRounds}`),
    }

    const UserRepository = {
      findOne: () => Promise.resolve(null),
      create: data => Promise.resolve(data),
    }

    const SignUpUseCaseValidator = makeSignUpValidator({
      UserRepository,
    })

    const signUpUseCase = makeSignUpUseCase({
      Encrypter,
      SignUpUseCaseValidator,
      UserRepository,
    })

    const user = {
      username: "a".repeat(300),
      email: "valid_email@email.com",
      password: "password",
    }

    const result = await signUpUseCase.execute(user)

    expect(result.value[0]).toEqual({
      message: "Username can't be longer than 255 characters",
      constraint: "max",
      field: "username",
    })
  })

  test("doesn't create user if password is too short", async () => {
    const Encrypter = {
      hash: (value: string, saltRounds: number) =>
        Promise.resolve(`${value}-${saltRounds}`),
    }

    const UserRepository = {
      findOne: () => Promise.resolve(null),
      create: data => Promise.resolve(data),
    }

    const SignUpUseCaseValidator = makeSignUpValidator({
      UserRepository,
    })

    const signUpUseCase = makeSignUpUseCase({
      Encrypter,
      SignUpUseCaseValidator,
      UserRepository,
    })

    const user = {
      username: "valid_username",
      email: "valid_email@email.com",
      password: "a",
    }

    const result = await signUpUseCase.execute(user)

    expect(result.value[0]).toEqual({
      message: "Password must be at least 5 characters long",
      constraint: "min",
      field: "password",
    })
  })

  test("doesn't create user if password is too long", async () => {
    const Encrypter = {
      hash: (value: string, saltRounds: number) =>
        Promise.resolve(`${value}-${saltRounds}`),
    }

    const UserRepository = {
      findOne: () => Promise.resolve(null),
      create: data => Promise.resolve(data),
    }

    const SignUpUseCaseValidator = makeSignUpValidator({
      UserRepository,
    })

    const signUpUseCase = makeSignUpUseCase({
      Encrypter,
      SignUpUseCaseValidator,
      UserRepository,
    })

    const user = {
      username: "valid_username",
      email: "valid_email@email.com",
      password: "a".repeat(300),
    }

    const result = await signUpUseCase.execute(user)

    expect(result.value[0]).toEqual({
      message: "Password must be less 255 characters long",
      constraint: "max",
      field: "password",
    })
  })

  test("creates user if none of the validations fail", async () => {
    const Encrypter = {
      hash: (value: string, saltRounds: number) =>
        Promise.resolve(`${value}-${saltRounds}`),
    }

    const UserRepository = {
      findOne: () => Promise.resolve(null),
      create: data => Promise.resolve(data),
    }

    const SignUpUseCaseValidator = makeSignUpValidator({
      UserRepository,
    })

    const signUpUseCase = makeSignUpUseCase({
      Encrypter,
      SignUpUseCaseValidator,
      UserRepository,
    })

    const user = {
      username: "johndoe",
      email: "valid_email@email.com",
      password: "password",
    }

    const result = await signUpUseCase
      .execute(user)
      .then(result => result.merge())

    expect(result.username).toBe(user.username)
    expect(result.email).toBe(user.email)
    expect(result.password).toBe("password-10")
  })
})
