import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {GeckoCoinMarketResponse, GeckoCoinResponse, GeckoMarketResponse} from './gecko.interface';

@Injectable()
export class GeckoFetcherService {
  private axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
  });

  public async getGeckoCoinInformations({
    geckoID,
  }: {
    geckoID: string;
  }): Promise<GeckoCoinResponse> {
    const res = await this.axiosInstance.get(`/coins/${geckoID}`, {
      params: {
        localization: false,
        market_data: true,
        sparkline: true,
      },
    });
    return res.data as GeckoCoinResponse;
  }

  public async getMarket(): Promise<GeckoMarketResponse> {
    const res = await this.axiosInstance.get(`/coins/markets`, {
      params: {
        vs_currency: 'eur',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
      },
    });
    return { market: res.data as GeckoCoinMarketResponse[] };
  }
}
