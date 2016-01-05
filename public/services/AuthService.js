import UriService from './UriService.js'

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

  login = (model) => {
    const payload = {
      emailOrUsername: model.emailOrUsername,
      password: model.password
    }
    this.post(payload, '/user/login')
  }

  post(payload, uri) {
    uri = UriService.baseUri() + uri
    console.log(`gonna post to ${uri} with `, payload)
  }
}

export default new AuthService()
