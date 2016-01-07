import { LOG_IN, LOG_OUT } from '../constants/ActionTypes'

export const logIn = (model, uri) => {
  return {
    type: LOG_IN,
    model,
    uri
  }
}

export const logOut = () => {
  return { type: LOG_OUT }
}
