import {DataSource, MongoRepository} from "typeorm"
import {User} from "../entities/user"
import {IncorrectPasswordError, UserAlreadyExistError} from "../errors"
import bcryptjs from "bcryptjs"
import {sign} from "jsonwebtoken"
import {Role} from "../entities/userRole"


export class UserController implements IUserController {
  private collection: MongoRepository<User>
  private readonly salt: string = bcryptjs.genSaltSync(7)

  constructor(dataSource: DataSource, private readonly secrete: string) {
    this.collection = dataSource.getMongoRepository<User>(User)
  }

  async login(login: string, password: string): Promise<string> {
    const user = await this.getUser(login)
    if (!user) {
      throw new UserAlreadyExistError(`user with login: ${login} already exist`)
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
      throw new IncorrectPasswordError("incorrect password")
    }
    const userPayload = {
      login,
      roles: user.roles,
      status: user.status
    }
    return sign(userPayload, this.secrete)
  }

  async register(login: string, password: string, roles: Array<Role> = ["USER"]): Promise<User> {
    const user = await this.getUser(login)

    if (user) {
      throw new UserAlreadyExistError(`user with login: ${login} already exists`)
    }
    const passwordHash = await bcryptjs.hash(password, this.salt)
    const newUser = new User(login, passwordHash, roles)
    return this.collection.save(newUser,{data:user})
  }

  private async getUser(login: string): Promise<User> {
    return this.collection.findOne({where: {login}})
  }

  async delete(login: string): Promise<void> {
    await this.collection.updateOne({login},{$set:{status: "DELETED", updatedAt: new Date()}})
  }
}

export interface IUserController {
  login(login: string, password: string): Promise<string>

  register(login: string, password: string): Promise<User>

  delete(login: string): Promise<void>
}