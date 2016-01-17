import React, { Component } from 'react'
import { connect } from 'react-redux'

import Snackbar from 'material-ui/lib/snackbar'

import mount from '../mount.js'
// import counter from '../reducers/counter.js'
import snacker from '../reducers/snacker.js'
import { openSnack, eatSnack } from '../actions/snacker.js'

class Login extends Component {

  test = () => {
    const { snacker, dispatch } = this.props
    dispatch(openSnack("test"))
  };
  render() {
    const { snacker, dispatch } = this.props


    return(
      <div>
        <h1>Login Page</h1>
        <button onClick={this.test}>Login</button>
        <Snackbar
          open={snacker.open}
          message={snacker.message}
          action="close"
          autoHideDuration={3000}
          onActionTouchTap={() => dispatch(eatSnack())}
          onRequestClose={() => dispatch(eatSnack())}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })

export default mount(connect(mapStateToProps)(Login), { snacker })
