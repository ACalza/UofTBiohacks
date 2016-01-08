import { LOG_IN, LOG_OUT } from '../constants/ActionTypes'

export const logIn = (data) => {
  return {
    type: LOG_IN,
    data
  }
}

export const logOut = () => {
  return { type: LOG_OUT }
}
