import {Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, Index} from "typeorm"
import {User} from "./user"
import {ObjectId} from "mongodb"

@Entity()
export class Article {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  @Index("tags-idx")
  tags: string[]

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date

  @UpdateDateColumn({type: 'timestamp', nullable: true, update: true})
  updatedAt?: Date

  @Column()
  creator: string

  @Column()
  privacy: ArticlePrivacy

  @Column()
  status: ArticleStatus

  constructor(title: string, content: string, tags: string[], privacy: ArticlePrivacy = "PUBLIC", creator: string,  status: ArticleStatus = "PUBLISHED") {
    this.title = title
    this.content = content
    this.tags = tags
    this.privacy = privacy
    this.status = status
    this.creator = creator
  }
}

export type ArticlePrivacy = "PUBLIC" | "PRIVATE"
export type ArticleStatus = "PUBLISHED" | "DELETED"