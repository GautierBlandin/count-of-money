import {API} from "../config/config";
import {GetAllCryptosResponse, GetCryptosResponse} from "@gautierblandin/types";

export async function getCryptos(symbols: string[]) {
    return (await API.get('/cryptos', {
        params: {
            cmids: symbols,
        }
    })).data as GetCryptosResponse;
}

export async function getAllCryptos() {
    return (await API.get('/cryptos/all')).data as GetAllCryptosResponse;
}
