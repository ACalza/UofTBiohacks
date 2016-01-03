import React, { Component } from 'react'
import request from 'superagent'

import AuthenticatedComponent from '../AuthenticatedComponent'
import UriService from '../services/UriService.js'


export default AuthenticatedComponent(class UserBox extends Component {
  getUsers() {
    request({
      url: UriService.baseUri() + '/user/all',
      method: 'GET',
      crossOrigin: true
    }).then(function(response) {
      console.log(response)
    })
  }

  render() {
    return (<h1>Hello {this.props.user.username}</h1>)
  }
})
