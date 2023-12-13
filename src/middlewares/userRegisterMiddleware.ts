import {RequestUserExtended} from "./authMiddleware"
import {NextFunction, Response} from "express"
import {userResponseMapper} from "../models/userDto"
import {IUserController} from "../controllers/userController"

export function getRegisterMiddleware(controller: IUserController) {
  return async function (req: RequestUserExtended, res: Response, next: NextFunction) {
    const {login, password} = req.body
    try {
      const user = await controller.register(login, password)
      return res.status(201).json(userResponseMapper(user))
    } catch (e) {
      next(e)
    }
  }
}