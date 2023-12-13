export class UserAlreadyExistError extends Error {
  public status: number
  public readonly code: string = "users/duplicate-error"
  constructor(message: string) {
    super(message)
    this.status = 409
  }
}

export class IncorrectPasswordError extends Error {
  public status: number
  public readonly code: string = "users/password-error"
  constructor(message: string) {
    super(message)
    this.status = 401
  }
}

export class ForbiddenDeleteUserError extends Error {
  public status: number
  public readonly code: string = "users/delete-error"
  constructor(message: string) {
    super(message)
    this.status = 403
  }
}

export class CreateArticleError extends Error {
  public status: number
  public readonly code: string = "article/create-error"
  constructor(message: string) {
    super(message)
    this.status = 401
  }
}

export class ArticleNotFoundError extends Error {
  public status: number
  public readonly code: string = "article/not-found-error"
  constructor(message: string) {
    super(message)
    this.status = 404
  }
}

export class ArticleUpdateError extends Error {
  public status: number
  public readonly code: string = "article/update-error"
  constructor(message: string) {
    super(message)
    this.status = 401
  }
}