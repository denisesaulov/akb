import {IArticleController} from "../controllers/articleController"
import {RequestUserExtended} from "./authMiddleware"
import {NextFunction, Response} from "express"
import {getArticleResponse} from "../models/articleDto"

export function getArticleFindMiddleware(controller: IArticleController) {
  return async function articleFindMiddleware(req: RequestUserExtended, res: Response, next: NextFunction) {
    const {tag} = req.query
    let tags: string[]
    if (tag) {
      switch (typeof tag) {
        case "string": {
          tags = [tag]
          break
        }
        case "object": {
          tags = tag as string[]
          break
        }
      }
    }
    const user = req.user
    const articles = await controller.findByTag(tags, user)
    res.status(200).json(articles.map(art => getArticleResponse(art)))
  }
}