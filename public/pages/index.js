/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Registration from '../components/Registration'

export default class extends Component {

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Registration />
      </div>
    );
  }
}
