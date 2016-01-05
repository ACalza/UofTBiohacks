import React, { Component } from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import Registration from '../Registration'

import AuthService from '../../services/AuthService'

export default class extends Component {
  constructor() {
    super()

    AuthService.setCB(this.onRegister)
  }

  onRegister(status) {
    console.log('from Home.js ', status)
  }

  render() {
    let content
    if ( canUseDOM ) {
      content = <Registration submitForm={AuthService.register}/>
    } else {
      content = <Form></Form>
    }

    return (
      <div>
        <h1>UofT BioHacks</h1>
        {content}
      </div>
    );
  }

}
