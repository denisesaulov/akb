import {IArticleDto} from "../models/articleDto"
import {Article} from "../entities/article"
import {DataSource, Document, MongoRepository} from "typeorm"
import {IPayload, UserTokenPayload} from "../models/IPayload"
import {checkPermissions} from "../handlers/checkPermissions"
import {ArticleNotFoundError, ArticleUpdateError} from "../errors"
import {ObjectId} from "mongodb"

export class ArticleController implements IArticleController {
  private readonly collection: MongoRepository<Article>

  constructor(dataSource: DataSource) {
    this.collection = dataSource.getMongoRepository<Article>(Article)
  }

  async create(article: Partial<IArticleDto>): Promise<Article> {
    const newArticle = new Article(article.title, article.content, article.tags, article.privacy, article.creator)
    return this.collection.save(newArticle, {data: newArticle})
  }

  async delete(articleId: string): Promise<void> {
    await this.collection.updateOne({_id: new ObjectId(articleId)}, {$set: {status: "DELETED", updatedAt: new Date()}})
  }

  async findByTag(tags: string[], user: UserTokenPayload): Promise<Article[]> {
    if (user && user.status !== "DELETED") {
      const where = {
        $or: [{creator: user.login, status: "PUBLISHED", ...(tags?.length > 0 ? {tags: {$in: [...tags]}} : {})}, {
          privacy: "PUBLIC",
          status: "PUBLISHED",
          ...(tags?.length > 0 ? {tags: {$in: [...tags]}} : {})
        }]
      }
      return this.collection.find({where: where})
    }
    const userUnauthorized = {$and:[{privacy:"PUBLIC"},{status:"PUBLISHED"}]}
    return this.collection.find({where: userUnauthorized})
  }

  async getById(articleId: string, user: UserTokenPayload): Promise<Article> {
    return this.collection.findOne({where: {_id: articleId, creator: user.login}})
  }

  async update(article: Partial<IArticleDto>, articleId: string, user: UserTokenPayload): Promise<Document> {
    if (user && checkPermissions(user)) {
      return this.collection.updateOne({_id: new ObjectId(articleId)}, {$set: {...article, updatedAt: new Date()}})
    }
    const articleFounded = await this.collection.findOne({where: {_id: new ObjectId(articleId)}})
    if (!articleFounded) {
      throw new ArticleNotFoundError(`article with id: ${articleId} not found`)
    }
    if (articleFounded.creator !== user.login) {
      throw new ArticleUpdateError(`only creator or ADMIN can update article`)
    }
    return this.collection.updateOne({_id: new ObjectId(articleId)}, {$set: {...article, updatedAt: new Date()}})
  }

}

export interface IArticleController {
  create(article: IArticleDto): Promise<Article>

  delete(articleId: string): Promise<void>

  update(article: Partial<IArticleDto>, articleId: string, user: UserTokenPayload): Promise<Document>

  findByTag(tags: string[], user: Partial<IPayload>): Promise<Article[]>

  getById(articleId: string, user: IPayload): Promise<Article>
}