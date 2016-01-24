import { AUTH_USER, AUTHORIZING } from '../constants/actions.js'

const initialState = {
  isNotInGroup: false,
  isInGroup: false,
  hasInvites: false,
  authorizing: false,
  authorized: false,
  groupModel: null,
  userModel: null
}

export default function account(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      console.log(action)
      return state
    case AUTHORIZING:
      return {
        ...state,
        authorizing: true
      }
    //TODO AUTHORIZED, FAILED_AUTHORIZATION
    default:
      return state
  }
}
