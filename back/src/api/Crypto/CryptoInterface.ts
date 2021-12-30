export interface GetCryptoResponse{
  name: string;
  currentPrice: number;
  lowestDailyPrice: number;
  highestDailyPrice: number;
  openingPrice: number;
  imageURL: string;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export interface GetCryptosResponse{
  cryptos: GetCryptosResponse[]
}

export interface PostCryptoRequest {
  geckoID: string;
}
