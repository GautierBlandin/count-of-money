import {AuthContext} from "../auth.context";
import React, {ComponentProps, useEffect, useState} from "react";
import {Config} from "@gautierblandin/comoney-api"

export default function AuthProvider({children} : ComponentProps<any>){
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [authToken, setAuthToken] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if(token){
            setAuthToken(token);
            Config.set_authorization(token);
        }
    }, []);

    useEffect(() => {
        const email = localStorage.getItem("email");
        if(email){
            setEmail(email);
        }
    }, []);

    const setAndStoreToken = (token: string) => {
        setAuthToken(token);
        Config.set_authorization(token);
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
