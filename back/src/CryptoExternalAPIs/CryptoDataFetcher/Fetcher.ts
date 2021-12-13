import axios, {AxiosInstance} from 'axios';
import {CryptoController} from "../../controller/CryptoController";
import {GeckoCoinResponse} from "../GeckoCoin/GeckoInterface";
import {
  CryptoData,
  CryptoDataRequest,
  CryptoExternalFetcher,
  HistoricData,
  HistoricDataRequest,
  Period
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

  public async getCryptoData({id}: CryptoDataRequest): Promise<CryptoData>{
    const geckoResponse = await this.getCoinInformations({geckoID: id})
    return  {
      currentPrice: geckoResponse.market_data.current_price.eur,
      highestDailyPrice: geckoResponse.market_data.high_24h.eur,
      id: geckoResponse.id,
      lowestDailyPrice: geckoResponse.market_data.low_24h.eur,
      name: geckoResponse.name,
      openingPrice: geckoResponse.market_data.sparkline_7d.price[168-12],
      symbol: geckoResponse.symbol,
      imageURL: geckoResponse.image.large
    }
  }

  public async getHistoricData({symbol, period, historyLength}: HistoricDataRequest) : Promise<HistoricData>{
    let alphaRes: any;
    switch (period){
      case Period.MINUTE:
         alphaRes = await this.getMinuteHistory({symbol: symbol, full: historyLength > 100})
          return {
           period: period,
            historyLength: historyLength,
            timezone: alphaRes['Meta Data']['9. Time Zone'],
            history: Object.entries(alphaRes['Time Series Crypto (1min)']).map((minuteInfo) => {
              return {
                openingDate: minuteInfo[0],
                opening: Number((minuteInfo[1] as any)['1. open']),
                highest: Number((minuteInfo[1] as any)['2. high']),
                lowest: Number((minuteInfo[1] as any)['3. low']),
                closing: Number((minuteInfo[1] as any)['4. close'])
              }
            }).slice(-historyLength)
          }
      case Period.HOURLY:
        alphaRes = await this.getHourlyHistory({symbol: symbol, full: historyLength > 100})
          return {
            period: period,
            historyLength: historyLength,
            timezone: alphaRes['Meta Data']['9. Time Zone'],
            history: Object.entries(alphaRes['Time Series Crypto (60min)']).map((hourlyInfo) => {
              return {
                openingDate: hourlyInfo[0],
                opening: Number((hourlyInfo[1] as any)['1. open']),
                highest: Number((hourlyInfo[1] as any)['2. high']),
                lowest: Number((hourlyInfo[1] as any)['3. low']),
                closing: Number((hourlyInfo[1] as any)['4. close'])
              }
            }).splice(-historyLength)
          }
      case Period.DAILY:
        alphaRes = await this.getDailyHistory({symbol: symbol})
        return {
          period: period,
          historyLength: historyLength,
          timezone: alphaRes['Meta Data']['7. Time Zone'],
          history: Object.entries(alphaRes['Time Series (Digital Currency Daily)']).map((dailyInfo) => {
            return {
              openingDate: dailyInfo[0],
              opening: Number((dailyInfo[1] as any)['1a. open (EUR)']),
              highest: Number((dailyInfo[1] as any)['2a. high (EUR)']),
              lowest: Number((dailyInfo[1] as any)['3a. low (EUR)']),
              closing: Number((dailyInfo[1] as any)['4a. close (EUR)'])
            }
          })
        };
    }
  }

  private async getCoinInformations({geckoID}: {geckoID: string}): Promise<GeckoCoinResponse>{
    const res = await this.geckoAxiosInstance.get(`/coins/${geckoID}`, {
      params: {
        localization: false,
        market_data: true,
        sparkline: true
      }
    })
    return res.data as GeckoCoinResponse;
  }

  private async getMinuteHistory({symbol, full}: {symbol: string, full?: boolean}){
    const res = await this.vantageAxiosInstance.get('', {params: {
        function: 'CRYPTO_INTRADAY',
        symbol: symbol.toUpperCase(),
        market: 'EUR',
        interval: '1min',
        outputsize: full?'full':undefined,
      }})
    return res.data;
  }

  private async getHourlyHistory({symbol, full}: {symbol: string, full: boolean}){
    const res = await this.vantageAxiosInstance.get('', {params: {
        function: 'CRYPTO_INTRADAY',
        symbol: symbol.toUpperCase(),
        market: 'EUR',
        interval: '60min',
        outputsize: full?'full':undefined
      }})
    return res.data;
  }

  private async getDailyHistory({symbol}: {symbol: string}){
    const res = await this.vantageAxiosInstance.get('', {params: {
        function: 'DIGITAL_CURRENCY_DAILY',
        symbol: symbol.toUpperCase(),
        market: 'EUR',
      }})
    return res.data;
  }
}
