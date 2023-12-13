import {IArticleController} from "../controllers/articleController"
import {RequestUserExtended} from "./authMiddleware"
import {NextFunction, Response} from "express"
import {ArticleResponse} from "../models/articleDto"

export function getArticleUpdateMiddleware(controller: IArticleController) {
  return async function articleUpdateMiddleware(req: RequestUserExtended, res: Response, next: NextFunction) {
    const {title, content, tags, privacy} = req.body
    const {articleId} = req.params
    try {
      const updatableObject = ArticleResponse.getFilledObject({title, content, tags, privacy})
      await controller.update(updatableObject, articleId, req.user)
      res.status(201).json("OK")
    } catch (e) {
      next(e)
    }
  }
}