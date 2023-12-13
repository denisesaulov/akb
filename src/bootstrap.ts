import {DataSource} from "typeorm"
import {User} from "./entities/user"
import bcryptjs from "bcryptjs"
import {UserRole} from "./entities/userRole"
import {IConfig} from "./config"

export async function bootstrap(ds: DataSource, config: IConfig): Promise<void> {
  const userCollection = ds.getMongoRepository<User>(User)
  const roleCollection = ds.getMongoRepository<UserRole>(UserRole)
  const user = await userCollection.findOne({where: {login: "admin"}})
  if (!user) {
    const passwordHash = await bcryptjs.hash(config.ADMIN_PASS, await bcryptjs.genSalt(7))
    const newUser = new User(config.ADMIN_LOGIN, passwordHash, ["ADMIN"])
    await userCollection.save(newUser)
  }
  const countDocuments = await roleCollection.count({})
  if (!countDocuments) {
    await roleCollection.save(new UserRole("ADMIN"))
    await roleCollection.save(new UserRole("USER"))
  }
  return
}