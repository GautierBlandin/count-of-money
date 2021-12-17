import {AuthContext} from "../auth.context";
import {ComponentProps, useState} from "react";

export default function AuthProvider({children} : ComponentProps<any>){
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [authToken, setAuthToken] = useState<string>("");


    return(
        <AuthContext.Provider value = {{
            email: email,
            username: username,
            authToken: authToken,
            setEmail: setEmail,
            setUsername: setUsername,
            setAuthToken: setAuthToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}
