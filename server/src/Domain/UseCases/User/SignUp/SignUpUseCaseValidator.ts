import { SignUpUser } from "./SignUpUseCase"
import { collect, Success, Failure } from "folktale/validation"
import * as Yup from "yup"

interface IUserRepository {
  findOne: (query: object) => Promise<any>
}

interface IDependencies {
  UserRepository: IUserRepository
}

export const isEmailValid = (user: SignUpUser) =>
  Yup.string()
    .email()
    .isValid(user.email)
    .then(valid =>
      valid
        ? Success(user)
        : Failure([
            {
              message: "Email must be valid",
              constraint: "email",
              field: "email",
            },
          ])
    )

export const isUsernameLongEnough = (user: SignUpUser) =>
  Yup.string()
    .min(5)
    .isValid(user.username)
    .then(valid =>
      valid
        ? Success(user)
        : Failure([
            {
              message: "Username must have at least 5 characters",
              constraint: "min",
              field: "username",
            },
          ])
    )

export const isUsernameNotTooLong = (user: SignUpUser) =>
  Yup.string()
    .max(255)
    .isValid(user.username)
    .then(valid =>
      valid
        ? Success(user)
        : Failure([
            {
              message: "Username can't be longer than 255 characters",
              constraint: "max",
              field: "username",
            },
          ])
    )

export const isPasswordLongEnough = (user: SignUpUser) =>
  Yup.string()
    .min(5)
    .isValid(user.password)
    .then(valid =>
      valid
        ? Success(user)
        : Failure([
            {
              message: "Password must be at least 5 characters long",
              constraint: "min",
              field: "password",
            },
          ])
    )

export const isPasswordNotTooLong = (user: SignUpUser) =>
  Yup.string()
    .max(255)
    .isValid(user.password)
    .then(valid =>
      valid
        ? Success(user)
        : Failure([
            {
              message: "Password must be less 255 characters long",
              constraint: "max",
              field: "password",
            },
          ])
    )

export const isEmailInuse = ({
  UserRepository,
  user,
}: {
  UserRepository: IUserRepository
  user: SignUpUser
}) =>
  UserRepository.findOne({ email: user.email })
    .then(Boolean)
    .then(exists =>
      exists
        ? Failure([
            {
              message: "Email already in use",
              constraint: "unique",
              field: "email",
            },
          ])
        : Success(user)
    )

const makeSignUpValidator = ({ UserRepository }: IDependencies) => ({
  validate: (user: SignUpUser) =>
    Promise.all([
      isEmailValid(user),
      isEmailInuse({ UserRepository, user }),
      isUsernameLongEnough(user),
      isUsernameNotTooLong(user),
      isPasswordLongEnough(user),
      isPasswordNotTooLong(user),
    ]).then(results => collect(results)),
})

export default makeSignUpValidator
