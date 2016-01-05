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

  statusEmitter = (status) => {
    if (status) {
      this.setState({
        loggedIn: true
      })
    } else {
      console.log(status)
    }
  }

  render() {
    let content
    if (!this.state.loggedIn) {
      content = <Home statusEmitter={this.statusEmitter}/>
    } else {
      content = <Account />
    }

    return(content)
  }
}
