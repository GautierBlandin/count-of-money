import {axiosInstance} from "./axios";

export function register(email: string, password: string){
    axiosInstance.post('/auth/register', {email, password})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}
