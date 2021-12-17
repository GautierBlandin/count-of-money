import React, {useState} from 'react';

function LoginComponent() {
    const [email, setEmail] = useState<string>('');

    const handleLogin = async () => {
        const auth_url = 'https://accounts.google.com/o/oauth2/auth'

        const params = [
            ['response_type', 'code'],
            ['client_id', '67182165806-r0l3mf6fg61t65h7n6df8b8a5jee78g0.apps.googleusercontent.com'],
            ['state', 'abcd'],
            ['redirect_uri', 'http://localhost:3000/oauth-callback'],
            ['scope', 'email'],
        ]

        const url = `${auth_url}?${params.map(el => el.join('=')).join('&')}`

        console.log(url)

        window.location.assign(url);
    }

    return (
        <div>
            <button onClick={handleLogin}> Log in with google </button>
            {/*<p>Your email is { email }</p>*/}
            {/*<button onClick={handleGettingAccessToken}> Handle google response</button>*/}
        </div>
    );
}

export default LoginComponent;
