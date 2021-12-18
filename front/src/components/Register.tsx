import React, { useState } from 'react';

import {
  Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';

import './Register.css';
import {AuthContext} from "../context/auth.context";
import {register} from "../api/Auth";
import {useNavigate} from "react-router-dom";

export default function Register() {

  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (evt: { preventDefault: () => void; }) => {
    const emailValidationRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    evt.preventDefault();
    if (emailValidationRegex.test(email) && password === passwordConfirm) {
      console.log("Registering user with email: " + email + " and password: " + password);
      const user = await register(email, password);
      if(user){
        authContext.setEmail(user.email);
        authContext.setAuthToken(user.access_token)
        navigate('/Home')
      }
    } else {
      console.log("Invalid email or password");
      alert("Invalid email or password");
    }
  }

    return (
      <div className="registerBackground">
        <div className="CRegister">
          <h1 className="HRegister">Register</h1>
          <p>Please fill in this form to create an account.</p>
          <Form className="FRegister">
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
            <FormGroup>
              <InputGroup>
                <InputGroupText>
                  Password
                </InputGroupText>
                <Input
                          id="FPasswordRepeat"
                          name="password"
                          placeholder="Repeat password"
                          type="password"
                          onChange={e => setPasswordConfirm(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="BSubmit">
              <Button
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </div>
            <div className="CLoginLink">
              <p>You already have an account or you want to login with Google? <a href="Login">Sign in</a>.</p>
            </div>
          </Form>
        </div>
      </div>
    );
}
