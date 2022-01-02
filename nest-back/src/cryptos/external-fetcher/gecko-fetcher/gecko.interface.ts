export interface GeckoCoinResponse {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    market_cap_rank: number;
    current_price: {
      eur: number;
      usd: number;
    };
    ath: {
      eur: number;
      usd: number;
    };
    market_cap: {
      eur: number;
    };
    high_24h: {
      eur: number;
      usd: number;
    };
    low_24h: {
      eur: number;
      usd: number;
    };
    sparkline_7d: {
      price: number[];
    };
  };
}
