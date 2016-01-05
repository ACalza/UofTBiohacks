import React, { Component } from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import Registration from '../Registration'

export default class extends Component {

  render() {
    let content
    if ( canUseDOM ) {
      content = <Registration />
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
