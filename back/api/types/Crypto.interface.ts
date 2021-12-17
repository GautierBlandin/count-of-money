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
