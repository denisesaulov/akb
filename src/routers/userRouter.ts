import {Router} from "express"
import {DataSource} from "typeorm"
import {UserController} from "../controllers/userController"
import {IConfig} from "../config"
import {getRegisterMiddleware} from "../middlewares/userRegisterMiddleware"
import {getUserDeleteMiddleware} from "../middlewares/userDeleteMiddleware"
import {getUserLoginMiddleware} from "../middlewares/userLoginMiddleware"
import {loginAndPasswordValidators} from "../middlewares/validators"
import {checkRequestError} from "../middlewares/checkRequestError"


export function getUsersRouter(db: DataSource, config: IConfig): Router {
  const router = Router()
  const controller = new UserController(db, config.SECRETE_CODE)

  router.post("/login", loginAndPasswordValidators, checkRequestError, getUserLoginMiddleware(controller))

  router.post("/register", loginAndPasswordValidators, checkRequestError, getRegisterMiddleware(controller))

  router.delete("/:login", getUserDeleteMiddleware(controller))

  return router
}
