import axios, {AxiosInstance} from 'axios';
import {CryptoController} from "../../controller/CryptoController";
import {GeckoCoinResponse} from "../GeckoCoin/GeckoInterface";
import {
  CryptoExternalFetcher,
  CryptoData,
  CryptoDataRequest,
  HistoricData,
  HistoricDataRequest
} from "../cryptoExternalFetcher.interface";


/**
 * @class CryptoFetcher - This class is used to fetch data from the external CoinGecko and AlphaVantage APIs.
 * This class implements the Singleton pattern, to get an instance, use the static getCryptoFetcher Method.
 */
export class CryptoFetcher implements CryptoExternalFetcher{
  private static cryptoFetcher: CryptoFetcher = new CryptoFetcher()

  /**
   * @method getCryptoFetcher() - Static getter for Singleton pattern
   */
  static getCryptoFetcher(){
    return this.cryptoFetcher;
  }

  private constructor() {
  }

  /**
   * @private
   * @property geckoAxiosInstance - The Axios instance configured with the base URL of the CoinGeko API. For API
   * documentation, see https://www.coingecko.com/en/api/documentation
   */
  private geckoAxiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3'
  });

  /**
   * @private
   * @property vantageAxiosInstance - The Axios instance configured the base URL of the AlphaVantage API. For API
   * documentation, see https://www.alphavantage.co/documentation/ , specifically the cryptocurrency section.
   */
  private vantageAxiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://alphavantage.co/query',
    params: {apikey: 'B83DCMU1MIFATDG0'}
  })

  /**
   * @method filldb() - Fill the database with the n most popular cryptocurrencies by market capitalisation
   * @param n
   */
  async filldb(n: number){
    const cryptoResponse = await this.geckoAxiosInstance.get('/coins/markets', {
      params: {
        vs_currency: 'eur',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false
      }
    })

    if(cryptoResponse.status == 200){
      const cryptoData = cryptoResponse.data
      for( let i = 0; i < n; i++){
        const crypto = cryptoData[i] as {id: string; symbol: string, name: string, image: string}
        const cryptoController = await CryptoController.getCryptoController();
        cryptoController.saveCrypto({
          name: crypto.name,
          symbol: crypto.symbol,
          geckoID: crypto.id,
          imageURL: crypto.image,
        }).catch(console.log)
      }
    }
  }

  async getCryptoData({id}: CryptoDataRequest): Promise<CryptoData>{
    
  }

  async getHistoricData({symbol, period, historyLength}: HistoricDataRequest) : Promise<HistoricData>{

  }

  async getCoinInformations({geckoID}: {geckoID: string}): Promise<GeckoCoinResponse>{
    const res = await this.geckoAxiosInstance.get(`/coins/${geckoID}`, {
      params: {
        localization: false,
        market_data: true,
        sparkline: true
      }
    })
    return res.data as GeckoCoinResponse;
  }

  async getMinuteHistory({symbol}: {symbol: string}){
    const res = await this.vantageAxiosInstance.get('', {params: {
        function: 'CRYPTO_INTRADAY',
        symbol: symbol.toUpperCase(),
        market: 'EUR',
        interval: '1min',
        outputsize: 'full',
      }})
    return res;
  }

  async getHourlyHistory({symbol}: {symbol: string}){
    const res = await this.vantageAxiosInstance.get('', {params: {
        function: 'CRYPTO_INTRADAY',
        symbol: symbol.toUpperCase(),
        market: 'EUR',
        interval: '60min'
      }})
    return res;
  }

  async getDailyHistory({symbol}: {symbol: string}){
    const res = await this.vantageAxiosInstance.get('', {params: {
        function: 'DIGITAL_CURRENCY_DAILY',
        symbol: symbol.toUpperCase(),
        market: 'EUR',
      }})
    return res;
  }
}
