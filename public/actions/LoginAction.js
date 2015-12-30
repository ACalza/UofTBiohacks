import cookie from 'react-cookie'

import AppDispatcher from '../dispatchers/AppDispatcher.js'

export default {
  loginUser: (jwt) => {
    // Go to another page once user logged in
    //RouterContainer.get().transitionTo('/')
    cookie.save('jwt', jwt)

    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      jwt: jwt
    })
  }
}
