import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index, BeforeUpdate
} from "typeorm"
import {ObjectId} from "mongodb"
import {Role, UserRole} from "./userRole"

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  @Index("login", {unique: true})
  login: string

  @Column()
  passwordHash: string

  @Column()
  roles: Role[]

  @CreateDateColumn({type: 'timestamp', default: new Date()})
  createdAt: Date

  @UpdateDateColumn({type: 'timestamp', nullable: true, update: true})
  updatedAt?: Date

  @Column()
  status: UserStatus

  constructor(login: string, passwordHash: string, roles: Role[]) {
    this._id = new ObjectId()
    this.passwordHash = passwordHash
    this.login = login
    this.createdAt = new Date()
    this.roles = roles
    this.status = "ACTIVE"
  }
}


export type UserStatus = "ACTIVE" | "DELETED"