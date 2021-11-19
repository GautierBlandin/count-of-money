import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid: string

  @PrimaryColumn()
  email: string

  @Column()
  password_hash: string
}
