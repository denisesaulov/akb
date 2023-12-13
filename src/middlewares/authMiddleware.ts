import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"
import {IPayload, UserTokenPayload} from "../models/IPayload"

export function getAuthMiddleware(secrete: string): (req: RequestUserExtended, _: Response, next: NextFunction) => void {
  return function authMiddleware(req: RequestUserExtended, res: Response, next: NextFunction): void {
    if (req.method === "OPTIONS") {
      next()
    }
    const token = req.headers?.authorization?.split(" ")[1]
    if (!token) {
      req.user = null
      next()
    } else {
      req.user = jwt.verify(token, secrete) as IPayload
      next()
    }
  }
}

export interface RequestUserExtended extends Request {
  user?: UserTokenPayload
}