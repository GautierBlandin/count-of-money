import React, { useState } from 'react';

import {
  Button, Form, FormGroup, Input, InputGroup, InputGroupText
} from 'reactstrap';

import './Login.css';

export default function Login() {

  // const [token, setToken] = useState();

  // if(!token) {
  //  return <Login setToken={setToken} />
  // }

  const [name, setName] = useState("");

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    alert(`Feedback: ${name}`)
  }

  return (
    <div className="CLogin">
      <h1 className="HLogin">Login</h1>
      <p>Please fill in this form to login to your account.</p>
      <Form className="FLogin" onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
              <InputGroupText>
                @
              </InputGroupText>
              <Input
                id="FEmail"
                name="email"
                placeholder="Enter email"
                type="email"
                onChange={e => setName(e.target.value)}
              />
            </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupText>
            •••
            </InputGroupText>
            <Input
              id="FPassword"
              name="password"
              placeholder="Enter password"
              type="password"
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
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
          </div>
        </div>
        <div className="CRegisterLink">
          <p>You don't have an account? <a href="Register">Sign up</a>.</p>
        </div>
      </Form>
    </div>
  );
}