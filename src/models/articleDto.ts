import {Article, ArticlePrivacy} from "../entities/article"

export interface IArticleDto {
  id?: string
  creator?: string
  title: string
  content: string
  tags: string[]
  privacy: "PRIVATE" | "PUBLIC"
}

export class ArticleResponse implements IArticleDto {
  id: string
  content: string
  privacy: "PRIVATE" | "PUBLIC"
  tags: string[]
  title: string
  creator: string

  constructor(title?: string, content?: string, tags?: string[], privacy?: ArticlePrivacy, id?: string, creator?: string) {
    this.content = content
    this.privacy = privacy
    this.tags = tags
    this.title = title
    this.id = id
    this.creator = creator
  }

  private static updatableFields = ["content", "title", "privacy", "tags"]

  static getFilledObject(articleDto: Partial<ArticleResponse>): Partial<IArticleDto> {
    return Object.fromEntries(Object.entries(articleDto).filter(([key, value]) => {
      return !!value && ArticleResponse.updatableFields.includes(key);
    }))
  }
}

export function getArticleResponse(article: Article): ArticleResponse {
  const {title, content, privacy, tags, _id: id, creator} = article
  return new ArticleResponse(title, content, tags, privacy, id.toString(), creator)
}