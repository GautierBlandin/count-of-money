export interface GetCryptoRequest {}
export interface GetCryptoResponse {
  name: string;
  id: string;
  symbol: string;
  currentPrice: number;
  openingPrice: number;
  highestDailyPrice: number;
  lowestDailyPrice: number;
  imageURL: string;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export interface GetAllCryptosResponse {
  cryptos: GetStaticCryptoResponse[]
}

export interface GetStaticCryptoResponse{
  "name": string,
  "symbol": string,
  "imageURL": string,
  "id": string,
}

export interface PostCryptoRequest {}
export interface PostCryptoResponse {}

export interface GetCryptosRequest {}
export interface GetCryptosResponse {
  cryptos: GetCryptoResponse[]
}

export interface GetRealTimeDataRequest {}

export interface GetRealTimeDataResponse {
  period: string;
  historyLength: number;
  timezone: string;
  history: {
    openingDate: string;
    opening: number;
    highest: number;
    lowest: number;
    closing: number;
  }[]
}

export enum Period{
  MINUTE = 'minute',
  HOURLY = 'hourly',
  DAILY = 'daily'
}

export interface MarketResponse{
  market: CoinMarketResponse[];
}

export interface CoinMarketResponse {
  "id": string;
  "symbol": string;
  "name": string;
  "image": string;
  "current_price": number;
  "market_cap": number;
  "market_cap_rank": number;
  "fully_diluted_valuation": number;
  "total_volume": number;
  "high_24h": number;
  "low_24h": number;
  "price_change_24h": number;
  "price_change_percentage_24h": number;
  "market_cap_change_24h": number;
  "market_cap_change_percentage_24h": number;
  "circulating_supply": number;
  "total_supply": number;
  "max_supply": number;
  "ath": number;
  "ath_change_percentage": number;
  "ath_date": string;
  "atl": number;
  "atl_change_percentage": number;
  "atl_date": string;
  "last_updated": string;
}
