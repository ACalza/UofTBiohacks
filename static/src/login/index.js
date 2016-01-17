import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from '../mount.js'
import counter from '../reducers/counter.js'

class Login extends Component {
  render() {
    return(
      <div>
        <h1>Login Page</h1>
        <button>Login</button>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({ counter })

export default mount(connect(mapStateToProps)(Login), { counter })
