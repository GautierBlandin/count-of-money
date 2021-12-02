import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';

import './Register.css';

class Register extends Component {

  render () {
    return (
      <div className="CRegister">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <Form className="FRegister">
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
            <p>Already have an account? <a href="Login">Sign in</a>.</p>
          </div>
        </Form>
      </div>
    );
  }
}

export default Register;