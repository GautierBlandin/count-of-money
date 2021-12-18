import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {CryptoCurrencyInterface} from "../interfaces/CryptoCurrency";

/**
 * @class CryptoCurrency - A class to represent a CryptoCurrency in db
 * @property uuid - The generated unique identifier for a crypto
 * @property name - The name of the cryptocurrency
 * @property symbol - The symbol representing the cryptocurrency, useful for querying the AlphaVatange API
 * @property geckoID - The coinGecko ID of the cryptocurrency, useful for qerying the CoinGecko API
 * @property imageURL - The Image URL of cryptocurrency's logo
 */
@Entity("crypto_currency")
export class CryptoCurrency implements CryptoCurrencyInterface{
  @PrimaryGeneratedColumn("uuid")
  uuid: string
  @Column({unique: true})
  name: string
  @Column({unique: true})
  symbol: string
  @Column()
  imageURL: string
  @Column({unique: true})
  geckoID: string
}
