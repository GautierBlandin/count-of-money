import { createContext } from "react";

export interface AuthContextInterface {
    email: string;
    authToken: string;
    username?: string;
    setEmail: (email: string) => void;
    setAuthToken: (authToken: string) => void;
    setUsername: (username: string) => void;
}

const defaultValues = {
    email: "",
    authToken: "",
    username: "",
    setEmail: () => {},
    setAuthToken: () => {},
    setUsername: () => {},
}

export const AuthContext = createContext<AuthContextInterface>(defaultValues);
