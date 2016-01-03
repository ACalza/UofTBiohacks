import jwt_decode from 'jwt-decode'
import autobind from 'decorator-autobind'

import AppDispatcher from '../dispatchers/AppDispatcher.js'
import BaseStore from './BaseStore.js'

class LoginStore extends BaseStore {
  constructor() {
    this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this))
    this._user = null
    this._jwt = null
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case 'LOGIN_USER':
        this._jwt = action.jwt
        this._user = jwt_decode(this._jwt)
        this.emitChange()
        break
      case 'LOGOUT_USER':
        this._user = null
        this.emitChange()
        break
      default:
        break
    }
  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore()
