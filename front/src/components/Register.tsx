import React, { useState } from 'react';

import {
  Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';

import './Register.css';

export default function Register() {

  const [email, setEmail] = useState("");

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    console.log({email})
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
                  @
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
            <FormGroup>
              <InputGroup>
                <InputGroupText>
                •••
                </InputGroupText>
                <Input
                          id="FPasswordRepeat"
                          name="password"
                          placeholder="Repeat password"
                          type="password"
                />
              </InputGroup>
            </FormGroup>
            <div className="BSubmit">
              <Button
                color="primary"
                type="submit"
              >
                Register
              </Button>
            </div>
            <div className="CLoginLink">
              <p>You already have an account or wanna login with Google? <a href="Login">Sign in</a>.</p>
            </div>
          </Form>
        </div>
      </div>
    );
}
