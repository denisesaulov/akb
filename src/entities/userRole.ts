import {Column, Entity, ObjectIdColumn} from "typeorm"
import {ObjectId} from "mongodb"

@Entity()
export class UserRole {
  @ObjectIdColumn()
  _id: ObjectId

  @Column({unique: true, type: "string"})
  role: Role

  constructor(role: Role) {
    this.role = role
  }
}

export type Role = "USER" | "ADMIN"