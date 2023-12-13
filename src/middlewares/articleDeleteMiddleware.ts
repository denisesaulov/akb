import {IArticleController} from "../controllers/articleController"
import {RequestUserExtended} from "./authMiddleware"
import {NextFunction, Response} from "express"
import {checkPermissions} from "../handlers/checkPermissions"
import {ForbiddenDeleteUserError} from "../errors"

export function getArticleDeleteMiddleware(controller: IArticleController) {
  return async function (req: RequestUserExtended, res: Response, next: NextFunction) {
    const {articleId: loginForDelete} = req.params
    const user = req.user
    const hasPermission = checkPermissions(user)
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