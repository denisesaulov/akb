import {NextFunction, Request, Response} from "express"
import {
  ArticleNotFoundError,
  ArticleUpdateError, CreateArticleError,
  ForbiddenDeleteUserError,
  IncorrectPasswordError,
  UserAlreadyExistError
} from "../errors"

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {

  if (err) {
    switch (true) {
      case (err instanceof ArticleNotFoundError):
      case (err instanceof CreateArticleError):
      case (err instanceof ArticleUpdateError):
      case (err instanceof UserAlreadyExistError):
      case (err instanceof IncorrectPasswordError):
      case (err instanceof ForbiddenDeleteUserError): {
        return res.status(err.status).json({code: err.code, message: err.message})
      }

      default: {
        console.log(err)
        return res.status(500).json({error: err})
      }
    }
  }
}