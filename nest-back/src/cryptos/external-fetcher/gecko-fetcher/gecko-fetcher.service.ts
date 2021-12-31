import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from "axios";
import {GeckoCoinResponse} from "./gecko.interface";


@Injectable()
export class GeckoFetcherService {
    private axiosInstance: AxiosInstance = axios.create({
        baseURL: 'https://api.coingecko.com/api/v3'
    });

    public async getGeckoCoinInformations({geckoID}: {geckoID: string}): Promise<GeckoCoinResponse>{
        const res = await this.axiosInstance.get(`/coins/${geckoID}`, {
            params: {
                localization: false,
                market_data: true,
                sparkline: true
            }
        })
        return res.data as GeckoCoinResponse;
    }
}
