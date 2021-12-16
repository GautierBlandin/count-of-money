"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geckoResponseToCryptoReponse = void 0;
function geckoResponseToCryptoReponse(geckoRes) {
    return {
        currentPrice: geckoRes.market_data.current_price.eur,
        highestDailyPrice: geckoRes.market_data.high_24h.eur,
        imageURL: geckoRes.image.large,
        lowestDailyPrice: geckoRes.market_data.low_24h.eur,
        name: geckoRes.name,
        openingPrice: geckoRes.market_data.sparkline_7d.price[167 - 12],
    };
}
exports.geckoResponseToCryptoReponse = geckoResponseToCryptoReponse;
