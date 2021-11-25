export interface CryptoExternalFetcher {
  getCryptoData: (req: CryptoDataRequest) => Promise<CryptoData>;
  getHistoricData: (req: HistoricDataRequest) => Promise<HistoricData>;
}

export interface CryptoData {
  name: string
  id: string
  symbol: string
  currentPrice: number
  openingPrice: number
  highestDailyPrice: number
  lowestDailyPrice: number
}

export interface HistoricData {
  period: Period
  historyLength: number
  history: HistoricPeriod[]
}

export interface HistoricPeriod {
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
  id: string
  symbol: string
  period: Period
  historyLength: number
}