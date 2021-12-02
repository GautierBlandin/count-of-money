import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';

import './Login.css';

class Login extends Component {

  render () {
    return (
      <div className="CLogin">
        <h1>Login</h1>
        <p>Please fill in this form to login to your account.</p>
        <Form className="FLogin">
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
          <div className="BSubmit">
            <Button
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </div>
          <div className="CRegisterLink">
            <p>You don't have an account? <a href="Register">Sign up</a>.</p>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;