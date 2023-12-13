import {Router} from "express"
import {DataSource} from "typeorm"
import {UserController} from "../controllers/userController"
import {IConfig} from "../config"
import {getRegisterMiddleware} from "../middlewares/userRegisterMiddleware"
import {getUserDeleteMiddleware} from "../middlewares/userDeleteMiddleware"
import {getUserLoginMiddleware} from "../middlewares/userLoginMiddleware"


export function getUsersRouter(db: DataSource, config: IConfig): Router {
  const router = Router()
  const controller = new UserController(db, config.SECRETE_CODE)

  router.post("/login", getUserLoginMiddleware(controller))

  router.post("/register", getRegisterMiddleware(controller))

  router.delete("/:login", getUserDeleteMiddleware(controller))

  return router
}
