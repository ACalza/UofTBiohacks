import { AUTHORIZING_USER, AUTHORIZED_USER } from '../constants/actions.js'

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
    case AUTHORIZING_USER:
      return {
        ...state,
        authorizing: true
      }
    case AUTHORIZED_USER:
      console.log(action)
      return {
        ...state,
        authorizing: false

      }
    //TODO AUTHORIZED, FAILED_AUTHORIZATION
    default:
      return state
  }
}
