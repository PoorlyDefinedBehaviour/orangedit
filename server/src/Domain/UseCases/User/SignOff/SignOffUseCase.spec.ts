import makeSignOffUsecase from "./SignOffUseCase"

describe("SignOffUseCase test suite", () => {
  test("uses provided Authenticator to sign off", async () => {
    let unauthorized = false

    const signOffUseCase = makeSignOffUsecase({
      Authenticator: {
        unauthorize: async (_: number | string) => {
          unauthorized = true
        },
      },
    })

    await signOffUseCase.execute("my_token_or_something")

    expect(unauthorized).toBe(true)
  })
})
