import React, { Component } from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import Registration from '../Registration'

import AuthService from '../../services/AuthService'

export default class extends Component {

  render() {
    let content
    if ( canUseDOM ) {
      content = <Registration submitForm={AuthService.register}/>
    } else {
      content = <div></div>
    }

    return (
      <div>
        <h1>UofT BioHacks</h1>
        {content}
      </div>
    );
  }

}
