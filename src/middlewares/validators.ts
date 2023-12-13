import {check} from "express-validator"

const min = 6
const max = 10

export const loginAndPasswordValidators = [
  check("login", "login can't be empty").notEmpty(),
  check("password", `password should be between ${min} and ${max} symbols`).isLength({min, max})
]

export const articleCreateValidator = [
  check([
    "title",
    "content",
    "tags",
    "privacy"
  ], (value) => {
    return `${value} can't be empty`
  }).notEmpty()
]