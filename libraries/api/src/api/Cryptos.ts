import {API} from "../config/config";
import {GetCryptosResponse} from "@gautierblandin/types";

export async function getCryptos(symbols: string[]) {
    return (await API.get('/cryptos', {
        params: {
            cmids: symbols,
        }
    })).data as GetCryptosResponse;
}
