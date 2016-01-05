import React, { Component } from 'react'

import Registration from '../Registration'
import Home from '../Home'
import Account from '../Account'

export default class Main extends Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false,
      token: ''
    }
  }

  render() {
    let content
    if (!this.state.loggedIn) {
      content = <Home />
    } else {
      content = <Account />
    }

    return(content)
  }
}
