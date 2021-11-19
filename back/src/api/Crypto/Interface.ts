export interface GetCryptoResponse{
  name: string;
  currentPrice: number;
  lowestDailyPrice: number;
  highestDailyPrice: number;
  openingPrice: number;
  imageURL: string;
}