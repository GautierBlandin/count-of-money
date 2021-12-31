import {GeckoCoinResponse} from "./GeckoInterface";
import {GetCryptoResponse} from "../../api/Crypto/CryptoInterface";

export function geckoResponseToCryptoReponse(geckoRes: GeckoCoinResponse):GetCryptoResponse{
  return {
    market_cap: geckoRes.market_cap,
    market_cap_rank: geckoRes.market_cap_rank,
    price_change_24h: geckoRes.price_change_24h,
    price_change_percentage_24h: geckoRes.price_change_percentage_24h,
    currentPrice: geckoRes.market_data.current_price.eur,
    highestDailyPrice: geckoRes.market_data.high_24h.eur,
    imageURL: geckoRes.image.large,
    lowestDailyPrice: geckoRes.market_data.low_24h.eur,
    name: geckoRes.name,
    openingPrice: geckoRes.market_data.sparkline_7d.price[167-12]
  }
}
