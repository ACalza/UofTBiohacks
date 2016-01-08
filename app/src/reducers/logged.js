import { LOG_IN, LOG_OUT, EAT_SNACK, REGISTER, CREATE_GROUP } from '../constants/ActionTypes'

import history from '../util/history'
import { ajaxPostAsync } from '../util'

const initialState = {
  jwt: null,
  snackbar: {
    message: '',
    open: false
  }
}

// reducer
export default function logged(state = initialState, action) {
  switch(action.type) {
    case LOG_IN: return handleLogIn(state, action.data)
    case LOG_OUT: return handleLogOut()
    case REGISTER: return handleRegister(state, action.data)
    case EAT_SNACK: return {...state, snackbar : {...state.snackbar, open: false}}
    case CREATE_GROUP: return handleCreateGroup(state, action.data) 
    default: return state
  }
}

const handleCreateGroup = (state, data) => {
  console.log(data)
  return state
}

const handleLogIn = (state, data ) => {
  return handleLogInOrRegister(state, data, 'Successfully logged in')
}

const handleRegister = (state, data) => {
  return handleLogInOrRegister(state, data, 'Successfully registered!')
}

const handleLogInOrRegister = (state, {token, message}, snackboxMessage) => {
  if (token) {
    history.replaceState(null, '/account')
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

const handleLogOut = () => {
  history.replaceState(null, '/')
  return {
    ...initialState,
    snackbar: {
      message: 'Logged out',
      open: true
    }
  }
}
