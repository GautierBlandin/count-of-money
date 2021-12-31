import { Injectable } from '@nestjs/common';
import {
    CryptoData,
    CryptoDataRequest,
    CryptoExternalFetcher,
    HistoricData,
    HistoricDataRequest
} from "../crypto-external-fetcher.interface";
import {AlphaVantageFetcherService} from "../alpha-vantage-fetcher/alpha-vantage-fetcher.service";
import {GeckoFetcherService} from "../gecko-fetcher/gecko-fetcher.service";

@Injectable()
export class ExternalFetcherService implements CryptoExternalFetcher{
    constructor(private alphaVantageFetcherService: AlphaVantageFetcherService,
                private geckoFetcherService: GeckoFetcherService) {}

    async getCryptoData(req: CryptoDataRequest): Promise<CryptoData> {
        const geckoResponse = await this.geckoFetcherService.getGeckoCoinInformations({
            geckoID: req.id
        });
        return {
            market_cap: geckoResponse.market_cap,
            market_cap_rank: geckoResponse.market_cap_rank,
            price_change_24h: geckoResponse.price_change_24h,
            price_change_percentage_24h: geckoResponse.price_change_percentage_24h,
            currentPrice: geckoResponse.market_data.current_price.eur,
            highestDailyPrice: geckoResponse.market_data.high_24h.eur,
            id: geckoResponse.id,
            lowestDailyPrice: geckoResponse.market_data.low_24h.eur,
            name: geckoResponse.name,
            openingPrice: geckoResponse.market_data.sparkline_7d.price[168-12],
            symbol: geckoResponse.symbol,
            imageURL: geckoResponse.image.large
        }
    }

    async getHistoricData(req: HistoricDataRequest): Promise<HistoricData> {
        return this.alphaVantageFetcherService.getHistoricData({
            historyLength: req.historyLength,
            period: req.period,
            symbol: req.symbol
        })
    }
}
