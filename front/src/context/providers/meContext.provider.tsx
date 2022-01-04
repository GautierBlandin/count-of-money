import {MeContext, Profile} from "../meContext.context";
import { useContext, useState, useEffect, ComponentProps } from "react";
import React from "react";
import {AuthContext} from "../auth.context";
import { UserAPI } from "@gautierblandin/comoney-api"

export default function MeProvider({children}: ComponentProps<any>){
    const [profile, setProfile] = useState<Profile|undefined>(undefined);
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if(authContext.authToken) {
            UserAPI.getUserProfile().then(setProfile)
        }
    }, [authContext.authToken])

    const updateWatchlist = (watchlist: string[]) => {
        if(profile) {
            UserAPI.updateUserProfile({cryptos: watchlist}).then(setProfile)
        }
    }

    return (
        <MeContext.Provider
            value={{
                profile,
                setProfile,
                updateWatchlist
        }}>
            {children}
        </MeContext.Provider>
    );
}
