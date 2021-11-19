import {Connection, createConnection} from "typeorm";

/**
 * @class DbConn - This class is used to wrap the db connection with a Singleton pattern as we can
 * only create one db connection at a time
 */
export class DbConn{
  private conn: Connection
  private static dbConn: DbConn

  private constructor() {
  }

  /**
   * @method getConn() - Returns the connection to the postgres database (see /back/ormconfig.json for configuration
   * informations
   */
  public static async getConn(){
    if(this.dbConn){
      return this.dbConn.conn;
    } else {
      const dbConn = new DbConn();
      dbConn.conn = await createConnection();
      this.dbConn = dbConn
      return dbConn.conn
    }
  }
}