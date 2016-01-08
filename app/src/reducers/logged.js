import { LOG_IN, LOG_OUT, REGISTER } from '../constants/ActionTypes'

import { ajaxPostAsync } from '../util'

const initialState = {
  jwt: null,
  snackbar: {
    message: '',
    open: false
  }
}

export default function logged(state = initialState, action) {
  switch(action.type) {
    case LOG_IN:
      console.log("Here")
     (function* (state, {model, uri}) {
        try{
          let response = yield ajaxPostAsync(model, uri)
          console.log(response)
          return {
            jwt: response.token || null,
            snackbar: {
              message: response.message || 'default',
              open: true
            }
          }
        }catch(err) {
          return state
        }
      })(state, action)
    case LOG_OUT: return initialState
    case REGISTER: return state
    default: return state
  }
}

const handleLogIn = (state, { model, uri}) => {
  ajaxPost(model, uri, (err, data) => {
    if (err) {
      console.error(err)
      return state
    } else {
      console.log(data)
      return {
        jwt: data.token,
        snackbar: {
          message: data.message,
          autoHideDuration: 3000,
          open: true
        }
      }
    }
  })
}
