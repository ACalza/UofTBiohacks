import { AUTH_USER, AUTHORIZING } from '../constants/actions.js'

const initialState = {
  isNotInGroup: true,
  isInGroup: false,
  hasInvites: false,
  authorizing: false,
  groupModel: null,
  userModel: null
}

export default function account(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      console.log(action)
      return state
    case AUTHORIZING
      return {
        ...state,
        authorizing: true
      }
    default:
      return state
  }
}
