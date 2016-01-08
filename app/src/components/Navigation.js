// Libraries
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureComponent from 'react-pure-render/component'

// Actions
import * as LoggedActions from '../actions/logged'

// Styles
import '../styles/Navigation.scss'

// Presentational Component
class Navigation extends PureComponent {
  logout = () => {
    const { logOut } = this.props.actions
    logOut()
  };

  render() {
    const { jwt } = this.props

    let content
    if (jwt !== null) {
      // Logged in
      content = <nav className="Navigation">
        <Link to="/" className="navLink"> home </Link>
        <Link to="/account" className="navLink"> account </Link>
        <a onClick={this.logout} className="navLink"> log out </a>
      </nav>
    } else {
      // Logged out
      content = <nav className="Navigation">
        <Link to="/" className="navLink"> home </Link>
        <Link to="/register" className="navLink"> register </Link>
        <Link to="/login" className="navLink"> log in </Link>
      </nav>
    }

    return (content)
  }
}

// Bindings into state and dispatch
const mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(LoggedActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
