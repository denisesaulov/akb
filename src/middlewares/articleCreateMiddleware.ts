import {IArticleController} from "../controllers/articleController"
import {RequestUserExtended} from "./authMiddleware"
import {NextFunction, Response} from "express"
import {CreateArticleError} from "../errors"

export function getArticleCreateMiddleware(controller: IArticleController){
  return async function articleCreateMiddleware(req: RequestUserExtended, res: Response, next: NextFunction) {
    const {title, content, tags, privacy} = req.body
    const user = req.user
    try {
      if (!user || user.status !== "ACTIVE") {
        throw new CreateArticleError("user doesn't have active status")
      }
      const article = await controller.create({privacy, content, title, tags, creator: user.login})
      res.status(201).json(article)
    } catch (e) {
      next(e)
    }
  }
}