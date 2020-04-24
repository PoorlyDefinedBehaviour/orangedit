interface IEncrypter {
  hash: (value: string, saltRounds: number) => Promise<string>
  compare: (hash: string, value: string) => Promise<boolean>
}

export default IEncrypter
