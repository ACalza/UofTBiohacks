import {
  LOG_IN,
  LOG_OUT,
  EAT_SNACK,
  REGISTER
} from '../constants/ActionTypes'

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
    case REGISTER: return handleRegister(state, action.data)
    case EAT_SNACK: return {...state, snackbar : {...state.snackbar, open: false}}
    default: return state
  }
}


const handleLogIn = (state, data ) => {
  return handleLogInOrRegister(state, data, 'Successfully logged in')
}

const handleRegister = (state, data) => {
  return handleLogInOrRegister(state, data, 'Successfully registered!')
}

const handleLogInOrRegister = (state, {token, message}, snackboxMessage) => {
  if (token) {
    return {
      ...state,
      jwt: token,
      snackbar: {
        message: snackboxMessage,
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
