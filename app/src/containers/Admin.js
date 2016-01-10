// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'



export default class Admin extends Component {
  render() {
    return(
      <p>Hello Admin</p>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt
  }
}
export default connect(mapStateToProps)(Admin)
