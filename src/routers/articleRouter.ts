import {Router} from "express"
import {type DataSource} from "typeorm"
import {ArticleController} from "../controllers/articleController"
import {getArticleCreateMiddleware} from "../middlewares/articleCreateMiddleware"
import {getArticleDeleteMiddleware} from "../middlewares/articleDeleteMiddleware"
import {getArticleFindMiddleware} from "../middlewares/articleFindMiddleware"
import {getArticleUpdateMiddleware} from "../middlewares/articleUpdateMiddleware"

export function getArticlesRouter(ds: DataSource): Router {
  const router = Router()
  const controller = new ArticleController(ds)

  router.post("/", getArticleCreateMiddleware(controller))

  router.delete("/:articleId", getArticleDeleteMiddleware(controller))

  router.get("/", getArticleFindMiddleware(controller))

  router.patch("/:articleId", getArticleUpdateMiddleware(controller))

  return router
}

