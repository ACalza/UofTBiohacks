/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import cookie from 'react-cookie'

import Login from '../components/Login'

export default class extends Component {
  constructor() {
    super()
    
    let jwt = cookie.load('jwt')
    if (jwt) {
      LoginActions.loginUser(jwt)
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Login />
      </div>
    );
  }

}
