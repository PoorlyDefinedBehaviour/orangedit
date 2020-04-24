import IUserDTO from "./ISignUpDTO"

interface ICreateUserValidator {
  validateOrFail: (data: IUserDTO) => Promise<void> | never
}

export default ICreateUserValidator
