import {axiosInstance} from "./axios";
import {GetCryptosResponse} from "./types/Crypto.interface";

export async function getCryptos(symbols: string[]) {
    return (await axiosInstance.get('/cryptos', {
        params: {
            cmids: symbols,
        }
    })).data as GetCryptosResponse;
}
