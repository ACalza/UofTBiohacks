import UriService from './UriService.js'

import cookie from 'react-cookie'
import $ from 'jquery'

class AuthService {
  register = (model) => {
    const payload = {
      email: model.email,
      name: model.name,
      username: model.username,
      password: model.password
    }
    this.post(payload, '/user/register')
  }

  setCB = (cb) => {
    this.cb = cb
  }

  login = (model) => {
    const payload = {
      emailOrUsername: model.emailOrUsername,
      password: model.password
    }
    this.post(payload, '/user/login')
  }

  post = (payload, uri) => {
    uri = UriService.baseUri() + uri
    console.log(`gonna post to ${uri} with `, payload)

    $.ajax({
      type: 'POST',
      url: uri,
      data: payload,
      success: function(data) {
        console.log(data)
        if (data.token) {
          console.log('Successful registration')
          cookie.save('jwt', data.token)
          this.cb(true, 'Successful registration')
        } else {
          this.cb(false, data.message)
          alert(data.message)
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }
}

export default new AuthService()
