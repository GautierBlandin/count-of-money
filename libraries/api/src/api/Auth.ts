import { API } from "../config/config";
import {AuthResponse, TokenValidationResponse} from "@gautierblandin/types"

export async function register(email: string, password: string):Promise<AuthResponse|undefined> {
    console.log(email, password);
    const response = await API.post('/users/register', {
        email: email,
        password: password}).catch(err => {
        console.log(err);
    });

    if(response) {
        return response.data as AuthResponse;
    }
    else return undefined;
}

export async function login(email: string, password: string):Promise<AuthResponse|undefined>{
    const response = await API.post('/users/login', {
        email: email,
        password: password}).catch(err => {
        console.log(err);
    });

    if(response) {
        return response.data as AuthResponse;
    }
    else return undefined;
}

export async function validateAccessToken(token: string):Promise<TokenValidationResponse|undefined> {
    const response = await API.post('/users/auth/validate', {
        token: token})
        .catch(err => {
        console.log(err);
    });

    if(response) {
        return response.data as TokenValidationResponse;
    }
    else return undefined;
}
