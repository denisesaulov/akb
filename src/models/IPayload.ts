import {UserStatus} from "../entities/user"

export interface IPayload{
  login: string
  roles: string[]
  status: UserStatus
}

export type UserTokenPayload = Partial<IPayload>