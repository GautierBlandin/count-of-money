import {
    useMemo,
    useContext,
    useEffect,
} from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth.context";
import React from 'react';

function OAuthCallbackComponent() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate();

    function useQuery() {
        const { search } = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    }
    const query = useQuery();

    useEffect(() => {
        axios.get('http://localhost:8079/users/auth/google', {
            params:{
                code: query.get("code")
            }
        }).then((res) => {
            console.log(res.data);
            authContext.setEmail(res.data.email)
            authContext.setAuthToken(res.data.access_token)
            navigate('/Home')
        })
    }, [])

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
}

export default OAuthCallbackComponent;
