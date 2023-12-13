import {IUserController} from "../controllers/userController"
import {RequestUserExtended} from "./authMiddleware"
import {NextFunction, Response} from "express"
import {checkPermissions} from "../handlers/checkPermissions"
import {ForbiddenDeleteUserError} from "../errors"

export function getUserDeleteMiddleware(controller: IUserController) {
  return async function userDeleteMiddleware(req: RequestUserExtended, res: Response, next: NextFunction) {
    const {login: loginForDelete} = req.params
    const payload = req.user
    const hasPermission = checkPermissions(payload)
    try {
      if (!hasPermission) {
        throw new ForbiddenDeleteUserError("user doesn't have enough permissions")
      }
      await controller.delete(loginForDelete)
      return res.status(204).json("OK")
    } catch (e) {
      next(e)
    }
  }
}