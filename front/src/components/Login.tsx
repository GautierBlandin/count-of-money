import React, { useState } from 'react';

import {
  Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';

import './Login.css';
import {login} from "../api/Auth";
import {AuthContext} from "../context/auth.context";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    console.log({email})
    console.log({password})
    const resp = await login(email, password);
    if(resp){
      authContext.setEmail(resp.email);
      authContext.setAuthToken(resp.access_token);
      navigate('/Home');
    }else {
      alert("Invalid credentials");
    }
  }

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
    <div className="loginBackground">
      <div className="CLogin">
        <h1 className="HLogin">Login</h1>
        <p>Please fill in this form to login to your account.</p>
        <Form className="FLogin" onSubmit={handleSubmit}>
          <FormGroup>
            <InputGroup>
                <InputGroupText>
                  Email
                </InputGroupText>
                <Input
                  id="FEmail"
                  email="email"
                  placeholder="Enter email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupText>
              Password
              </InputGroupText>
              <Input
                id="FPassword"
                name="password"
                placeholder="Enter password"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
          <div className="flex-container">
            <div className="flex-child">
              <Button
                color="primary"
                type="submit"
              >
                Login
              </Button>
              <div className="g-signin2" data-onsuccess="onSignIn" onClick={handleLogin}/>
            </div>
          </div>
          <div className="CRegisterLink">
            <p>You don't have an account? <a href="Register">Sign up</a>.</p>
          </div>
        </Form>
      </div>
    </div>
  );
}
