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
    case LOG_IN: return handleLogIn(state, action.data)
    case LOG_OUT: return initialState
    case REGISTER: return state
    default: return state
  }
}

const handleLogIn = (state, { token, message} ) => {
  // console.log(action)

  if (token) {
    return {
      ...state,
      jwt: token,
      snackbar: {
        message: 'Successfuly logged in',
        open: true
      }
    }
  } else {
    return {
      ...state,
      snackbar: {
        message,
        open: true
      }
    }
  }
}
