import {DataSource} from "typeorm"
import {IConfig} from "./config"
import {User} from "./entities/user"
import {Article} from "./entities/article"
import {UserRole} from "./entities/userRole"

export function getDataSource(config: IConfig): DataSource {
  const {DB_HOST, DB_TYPE, DB_PORT, DB_NAME, DB_USER_NAME, DB_PASSWORD} = config
  return new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    entities:[User, Article, UserRole],
    synchronize: true
  })
}