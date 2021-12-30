export interface CryptoExternalFetcher {
  getCryptoData: (req: CryptoDataRequest) => Promise<CryptoData>;
  getHistoricData: (req: HistoricDataRequest) => Promise<HistoricData>;
}

export interface CryptoData {
  name: string
  id: string
  symbol: string
  imageURL: string
  currentPrice: number
  openingPrice: number
  highestDailyPrice: number
  lowestDailyPrice: number
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export interface HistoricData {
  period: Period
  historyLength: number
  timezone: string
  history: HistoricPeriod[]
}

export interface HistoricPeriod {
  openingDate: string
  opening: number
  highest: number
  lowest: number
  closing: number
}

export interface CryptoDataRequest {
  id: string
  symbol: string
}

export enum Period {
  DAILY = 'DAILY',
  HOURLY = 'HOURLY',
  MINUTE = 'MINUTE'
}

export interface HistoricDataRequest {
  id?: string
  symbol: string
  period: Period
  historyLength: number
}
