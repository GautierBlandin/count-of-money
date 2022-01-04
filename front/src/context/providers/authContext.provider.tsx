import {AuthContext} from "../auth.context";
import React, {ComponentProps, useEffect, useState} from "react";
import {Config, AuthAPI} from "@gautierblandin/comoney-api"

export default function AuthProvider({children} : ComponentProps<any>){
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [authToken, setAuthToken] = useState<string>("");

    // Fetch the token from localStorage and ask the api for validation
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(token){
            AuthAPI.validateAccessToken(token).then(res => {
                if(res?.valid) {
                    setEmail(res.email!);
                    setAndStoreToken(res.token!);
                } else {
                    setAuthToken("");
                    setEmail('');
                    Config.set_authorization("");
                }
            })
        }
    }, []);

    const setAndStoreToken = (token: string) => {
        Config.set_authorization(token);
        setAuthToken(token);
        localStorage.setItem("authToken", token);
    }

    const setAndStoreEmail = (email: string) => {
        setEmail(email);
        localStorage.setItem("email", email);
    }

    return(
        <AuthContext.Provider value = {{
            email: email,
            username: username,
            authToken: authToken,
            setEmail: setAndStoreEmail,
            setUsername: setUsername,
            setAuthToken: setAndStoreToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}
