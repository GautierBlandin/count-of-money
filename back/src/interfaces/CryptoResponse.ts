export interface GetCryptoReponse{
  name: string;
  currentPrice: number;
  openingPrice: number;
  lowerDailyPrice: number;
  highestDailyPrice: number;
  imageURL: string;
}

interface Period{
  opening: number;
  highest: number;
  lowest: number;
  closing: number;
}

export interface GetCryptoHistoryResponse{
  history: Period[];
}

