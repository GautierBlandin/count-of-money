import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("User")
export class User {
  @PrimaryColumn({unique: true})
  email: string

  @Column({nullable: true})
  password_hash?: string

  @Column({default: "EUR"})
  currency?: string

  @Column("simple-array")
  cryptos: string[]

  @Column("simple-array")
  press_keywords: string[]

  @Column({nullable: true})
  access_token?: string

  @Column({default: false})
  admin: boolean
}
