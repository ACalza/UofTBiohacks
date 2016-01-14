import React from 'react'
import PureComponent from 'react-pure-render/component'


export default class AccountDetails extends PureComponent {
  render() {
    const { userModel } = this.props

    return(
      <div className="accountDetails">
        <h2> Account details </h2>
        <b>Username: </b>{userModel.username} <br></br>
        <b>Email: </b>{userModel.email}
      </div>
    )
  }
}
