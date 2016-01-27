import React, { Component } from 'react'
import { connect } from 'react-redux'

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

    if (!sessionStorage.getItem('jwt')) {
        navbarLinks.push(<a href="/">Home</a>)
        navbarLinks.push(<a href="/register">Register</a>)
        navbarLinks.push(<a href="/login">Login</a>)
    } else {
        nabbarLinks.push(<a href="/home">Home</a>)
        navbarLinks.push(<a href="/account">Account</a>)
        navbarLinks.push(<a href="#" onClick={this.logout}>Logout</a>)
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
              autoHideDuration={3000}
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
