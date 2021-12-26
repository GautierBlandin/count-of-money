import {axiosInstance} from "./axios";
import {GetCryptosResponse} from "@gautierblandin/types";

export async function getCryptos(symbols: string[]) {
    return (await axiosInstance.get('/cryptos', {
        params: {
            cmids: symbols,
        }
    })).data as GetCryptosResponse;
}
