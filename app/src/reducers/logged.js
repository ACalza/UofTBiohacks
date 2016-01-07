import { LOG_IN, LOG_OUT, REGISTER } from '../constants/ActionTypes'

import { ajaxPost } from '../util'

const initialState = {
  model: null
}

export default function logged(state = initialState, action) {
  switch(action.type) {
    case LOG_IN: return handleLogIn(state, action)
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
      return state
    }
  })
  return action
}
