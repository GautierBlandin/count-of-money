import {CryptoCurrency} from "../entity/CryptoCurrency";
import {Repository} from "typeorm";
import {
  CreateCryptoCurrencyRequest,
  DeleteCryptoCurrencyRequest, GetCryptoCurrencyRequest,
  UpdateCryptoCurrencyRequest
} from "../interfaces/CryptoCurrency";
import {DbConn} from "../db/connection";

/**
 * @class CryptoController - Manage CryptoCurrencies in the db.
 */
export class CryptoController{
  cr: Repository<CryptoCurrency>

  /**
   * @private
   * @constructor - Create a new cryptocontroller, private for async call in controller creation
   */
  private constructor() {
  }

  /**
   * @static
   * @method getCryptoController() - Get the global instance of CryptoController
   */
  static async getCryptoController(){
    const controller = new CryptoController();
    const connection = await DbConn.getConn();
    controller.cr = connection.getRepository(CryptoCurrency)
    return controller
  }

  /**
   * @method getCrypto - Get the first crypto matching the constraint of the req object.
   * @param req
   */
  async getCrypto(req: GetCryptoCurrencyRequest):Promise<CryptoCurrency | undefined>{
    return await this.cr.findOne({where: req})
  }

  /**
   * @method saveCrypto() - Save a CryptoCurrency in the database
   * @param req
   */
  async saveCrypto(req: CreateCryptoCurrencyRequest){
    const cryptoCurency = new CryptoCurrency()
    if( req.name ) cryptoCurency.name = req.name;
    if( req.imageURL ) cryptoCurency.imageURL = req.imageURL;
    if( req.symbol ) cryptoCurency.symbol = req.symbol;
    if( req.geckoID ) cryptoCurency.geckoID = req.geckoID;
    return await this.cr.save(cryptoCurency);
  }

  /**
   * @method updateCrypto() - Updates a CryptoCurrency in the database
   * @param req - A request to update a Crypto
   */
  async updateCrypto(req: UpdateCryptoCurrencyRequest){
    const crypto = (await this.cr.findOne({uuid: req.uuid})) as CryptoCurrency;
    //Update the field in they are present
    if( req.name ) crypto.name = req.name;
    if( req.imageURL ) crypto.imageURL = req.imageURL;
    if( req.symbol ) crypto.symbol = req.symbol;
    if( req.geckoID ) crypto.geckoID = req.geckoID;
    return await this.cr.save(crypto);
  }

  /**
   * @method deleteCrypto() - Deletes a CryptoCurrency in the database
   * @param req
   */
  async deleteCrypto(req: DeleteCryptoCurrencyRequest){
    return await this.cr.delete(req)
  }
}