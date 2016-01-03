import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import LoginStore from '../stores/LoginStore.js'

// receive a Component, return new Component that wraps it and
// gives user/login info as props
export default (ComposedComponent) => {
  return class AuthenticatedComponent extends Component {
    constructor() {
      super()
      this.state = this._getLoginState()
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt
      }
    }

    componentDidMount() {
      LoginStore.addChangeListener(this._onChange.bind(this))
    }

    _onChange() {
      this.setState(this._getLoginState())
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this._onChange.bind(this))
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          user={this.state.user}
          jwt={this.state.jwt}
          userLoggedIn={this.state.userLoggedIn}
        />
      )
    }
  }
}
