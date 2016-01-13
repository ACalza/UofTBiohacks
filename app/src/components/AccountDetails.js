import React from 'react'
import PureComponent from 'react-pure-render/component'


export default class AccountDetails extends PureComponent {
  render() {
    const { userModel } = this.props

    return(
      <div className="accountDetails">
        <b>Username: </b>{userModel.username}
        <b>Email: </b>{userModel.email}
      </div>
    )
  }
}
