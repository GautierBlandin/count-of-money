import {
    useMemo,
    useContext,
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import {AuthContext} from "../context/auth.context";

function OAuthCallbackComponent() {

    const [coinres, setCoinres] = useState({})

    const authContext = useContext(AuthContext)

    const [email, setEmail] = useState<string>("");

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
        })
    }, [])

    useEffect(() => {
        setEmail(authContext.email)
    }, [authContext.email])

    return (
        <div>
            Your email is {email}
            Your access token is {authContext.authToken}
        </div>
    );
}

export default OAuthCallbackComponent;
