import {User} from "../entities/user"
import {Role} from "../entities/userRole"

export interface UserDto {
  login: string
  password: string
  roles: Role[]
}

export class UserResponse {
  public login: string
  public roles: Role[]

  constructor(user: User) {
    this.roles = user.roles
    this.login = user.login
  }
}

export function userResponseMapper(user: User): UserResponse {
  return new UserResponse(user)
}