import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  required,
  email as validEmail,
} from '../../helpers/validation';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: null,
      password: '',
      passwordError: null,
      serverError: null,
    };
  }
  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();

    // clear errors
    this.setState({
      serverError: null,
      emailError: null,
      passwordError: null,
    });

    // frontend validation
    const emailError = validEmail(email);
    const passwordError = required(password);
    if ( emailError || passwordError ) {
      this.setState({ emailError, passwordError });
      return;
    }

    // fire the API
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if ( data.error ) {
          this.setState({ serverError: data.error });
        }
      });
  }
  render() {
    const {
      email, emailError,
      password, passwordError,
      serverError,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit} >
        { serverError &&
          <div data-test="serverError" style={{ color: 'red' }} >{serverError}</div>
        }
        <label> Email </label><br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.onInputChange}
        />
        { emailError &&
          <div data-test="emailError" style={{ color: 'red' }} >{emailError}</div>
        }
        <br />
        <label> Password </label><br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.onInputChange}
        />
        { passwordError &&
          <div data-test="passwordError" style={{ color: 'red' }} >{passwordError}</div>
        }
        <br />
        <button> Submit </button>
      </form>
    );
  }
}
export default hot(module)(LoginPage);
