import {IPayload} from "../models/IPayload"
import {ForbiddenDeleteUserError} from "../errors"

export function checkPermissions(tokePayload: Partial<IPayload>): boolean {
  return (tokePayload &&
    tokePayload.roles &&
    tokePayload.roles.length &&
    tokePayload.roles.includes("ADMIN") &&
    tokePayload.status === "ACTIVE")
}