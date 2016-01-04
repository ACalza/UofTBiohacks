import React, { Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import Login from '../components/Login/Login.js'

export default class extends Component {

  render() {
    let content = <div></div>
    if (canUseDOM) {
      content = <Login />
    }

    return (content)
  }

}
