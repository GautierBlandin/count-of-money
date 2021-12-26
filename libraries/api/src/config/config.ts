import Axios from 'axios';
import qs from 'qs';

export const API = Axios.create({
    timeout: 10000,
    paramsSerializer: params => {
        return qs.stringify(params)
    }
});

interface Config{
    baseUrl: string;
    accessToken?: string;
}

export function initialize({baseUrl, accessToken}: Config){
    API.defaults.baseURL = baseUrl
    if(accessToken) API.defaults.headers.common['Authorization'] = accessToken;
}

export function set_authorization(accessToken: string){
    API.defaults.headers.common['Authorization'] = accessToken
}
