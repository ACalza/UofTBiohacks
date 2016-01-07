import { LOG_IN, LOG_OUT } from '../constants/ActionTypes'

const initialState = false

export default function logged(state = initialState, action) {
  switch(action.type) {
    case LOG_IN: return true
    case LOG_OUT: return false
    default: return state
  }
}
