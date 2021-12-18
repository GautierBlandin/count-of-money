import {axiosInstance} from "./axios";
import {AuthResponse} from "./types/Auth.interface";

export async function register(email: string, password: string):Promise<AuthResponse|undefined> {
    console.log(email, password);
    const response = await axiosInstance.post('/users/register', {
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
    const response = await axiosInstance.post('/users/login', {
        email: email,
        password: password}).catch(err => {
        console.log(err);
    });

    if(response) {
        return response.data as AuthResponse;
    }
    else return undefined;
}
