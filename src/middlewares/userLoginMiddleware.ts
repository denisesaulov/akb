import {IUserController} from "../controllers/userController"
import {RequestUserExtended} from "./authMiddleware"
import {NextFunction, Response} from "express"

export function getUserLoginMiddleware(controller: IUserController){
  return async function userLoginMiddleware(req: RequestUserExtended, res: Response, next: NextFunction) {
    const {login, password} = req.body
    try {
      const token = await controller.login(login, password)
      return res.status(201).json({token})
    } catch (e) {
      next(e)
    }
  }
}