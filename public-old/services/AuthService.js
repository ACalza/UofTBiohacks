import request from 'superagent'
import when from 'when'

import LoginActions from '../actions/LoginAction.js'
import UriService from './UriService.js'

class AuthService {
  login(username, email, password) {
    return when(request({
      url: UriService.baseUri() + '/user/login',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {username, email, password}
    })).then(function(response) {
      let jwt = response.id_token
      LoginActions.loginUser(jwt)
      return true
    })
  }
}

export default new AuthService()
