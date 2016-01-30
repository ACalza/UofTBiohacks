import React, { Component } from 'react'
import { connect } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import snacker from '../reducers/snacker.js'

import { Snackbar } from 'material-ui/lib'
import { openSnack, eatSnack } from '../actions/snacker.js'

class Layout extends Component {
  logout() {
    sessionStorage.removeItem('jwt')
    window.location.assign('/')
  }

  render() {
    const {dispatch, snacker} = this.props

    let navbarLinks = []

    if (canUseDOM && !sessionStorage.getItem('jwt')) {
      // Not logged in
      navbarLinks.push(<a key="1" href="/">Home</a>)
      navbarLinks.push(<a key="2" href="/register">Register</a>)
      navbarLinks.push(<a key="3" href="/login">Login</a>)
    } else {
      // Logged in
      navbarLinks.push(<a key="1" href="/">Home</a>)
      navbarLinks.push(<a key="2" href="/account">Account</a>)
      navbarLinks.push(<a key="3" href="#" onClick={this.logout}>Logout</a>)
    }

    let outerStyles = {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }
    let innerStyles = {
      flex: '1',
      paddingBottom: '30px',
      background: '#eee'
    }
    return (
      <div style={outerStyles}>
          <div className="content" style={innerStyles}>
            {navbarLinks.map(l => l)}

            {this.props.children}
            <Snackbar
              open={snacker.open}
              message={snacker.message}
              action="close"
              autoHideDuration={4000}
              onActionTouchTap={() => dispatch(eatSnack())}
              onRequestClose={() => dispatch(eatSnack())}
            />
          </div>
      </div>
    )
  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(Layout)
