import {GeckoCoinResponse} from "./GeckoInterface";
import {GetCryptoResponse} from "../../api/Crypto/CryptoInterface";

export function geckoResponseToCryptoReponse(geckoRes: GeckoCoinResponse):GetCryptoResponse{
  return {
    currentPrice: geckoRes.market_data.current_price.eur,
    highestDailyPrice: geckoRes.market_data.high_24h.eur,
    imageURL: geckoRes.image.large,
    lowestDailyPrice: geckoRes.market_data.low_24h.eur,
    name: geckoRes.name,
    openingPrice: geckoRes.market_data.sparkline_7d.price[167-12],
  }
}