import { Injectable } from '@nestjs/common';
import {HistoricData, HistoricDataRequest, Period} from "../crypto-external-fetcher.interface";
import axios, {AxiosInstance} from "axios";

@Injectable()
export class AlphaVantageFetcherService {
    private axiosInstance: AxiosInstance = axios.create({
        baseURL: 'https://alphavantage.co/query',
        params: {apikey: process.env.ALPHAVANTAGE_API_KEY}
    })

    private async getMinuteHistory({symbol, full}: {symbol: string, full?: boolean}){
        const res = await this.axiosInstance.get('', {params: {
                function: 'CRYPTO_INTRADAY',
                symbol: symbol.toUpperCase(),
                market: 'EUR',
                interval: '1min',
                outputsize: full?'full':undefined,
            }})
        return res.data;
    }

    private async getHourlyHistory({symbol, full}: {symbol: string, full: boolean}){
        const res = await this.axiosInstance.get('', {params: {
                function: 'CRYPTO_INTRADAY',
                symbol: symbol.toUpperCase(),
                market: 'EUR',
                interval: '60min',
                outputsize: full?'full':undefined
            }})
        return res.data;
    }

    private async getDailyHistory({symbol}: {symbol: string}){
        const res = await this.axiosInstance.get('', {params: {
                function: 'DIGITAL_CURRENCY_DAILY',
                symbol: symbol.toUpperCase(),
                market: 'EUR',
            }})
        return res.data;
    }

    public async getHistoricData({symbol, period, historyLength}: HistoricDataRequest) : Promise<HistoricData>{
        let alphaRes: any;
        switch (period){
            case Period.MINUTE:
                alphaRes = await this.getMinuteHistory({symbol: symbol, full: historyLength > 100})
                return {
                    period: period,
                    historyLength: historyLength,
                    timezone: alphaRes['Meta Data']['9. Time Zone'],
                    history: Object.entries(alphaRes['Time Series Crypto (1min)']).map((minuteInfo) => {
                        return {
                            openingDate: minuteInfo[0],
                            opening: Number((minuteInfo[1] as any)['1. open']),
                            highest: Number((minuteInfo[1] as any)['2. high']),
                            lowest: Number((minuteInfo[1] as any)['3. low']),
                            closing: Number((minuteInfo[1] as any)['4. close'])
                        }
                    }).slice(-historyLength)
                }
            case Period.HOURLY:
                alphaRes = await this.getHourlyHistory({symbol: symbol, full: historyLength > 100})
                return {
                    period: period,
                    historyLength: historyLength,
                    timezone: alphaRes['Meta Data']['9. Time Zone'],
                    history: Object.entries(alphaRes['Time Series Crypto (60min)']).map((hourlyInfo) => {
                        return {
                            openingDate: hourlyInfo[0],
                            opening: Number((hourlyInfo[1] as any)['1. open']),
                            highest: Number((hourlyInfo[1] as any)['2. high']),
                            lowest: Number((hourlyInfo[1] as any)['3. low']),
                            closing: Number((hourlyInfo[1] as any)['4. close'])
                        }
                    }).splice(-historyLength)
                }
            case Period.DAILY:
                alphaRes = await this.getDailyHistory({symbol: symbol})
                return {
                    period: period,
                    historyLength: historyLength,
                    timezone: alphaRes['Meta Data']['7. Time Zone'],
                    history: Object.entries(alphaRes['Time Series (Digital Currency Daily)']).map((dailyInfo) => {
                        return {
                            openingDate: dailyInfo[0],
                            opening: Number((dailyInfo[1] as any)['1a. open (EUR)']),
                            highest: Number((dailyInfo[1] as any)['2a. high (EUR)']),
                            lowest: Number((dailyInfo[1] as any)['3a. low (EUR)']),
                            closing: Number((dailyInfo[1] as any)['4a. close (EUR)'])
                        }
                    })
                };
        }
    }
}
