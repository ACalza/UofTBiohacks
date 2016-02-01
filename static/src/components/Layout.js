import React, { Component } from 'react'
import { connect } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import snacker from '../reducers/snacker.js'

import Navigation from './Navigation.js'

import { Snackbar } from 'material-ui/lib'
import { openSnack, eatSnack } from '../actions/snacker.js'

class Layout extends Component {
  render() {
    const { snacker, push, dispatch } = this.props

    let status
    if (canUseDOM && sessionStorage.getItem('jwt')) {
      status = 'loggedIn'
    } else {
      status = 'loggedOut'
    }

    // TODO move to CSS
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
            {push ? <div className="headerPush" /> : null}
            <Navigation title="" status={status} />

            {this.props.children}

            <Snackbar
              open={snacker.open}
              message={snacker.message}
              action="close"
              autoHideDuration={10000}
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
