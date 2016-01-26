import { AUTHORIZING_USER, AUTHORIZED_USER, AUTHORIZATION_FAILED} from '../constants/actions.js'

const initialState = {
  isNotInGroup: false,
  isInGroup: false,
  hasInvites: false,
  authorizing: true,
  authorized: false,
  groupModel: null,
  isSignedIn: false,
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
      let response = action.response
      //Handle state better
      return {
        ...state,
        authorizing: false,
        authorized: true,
        isSignedIn: true,
        userModel: response.userModel,
        groupModel: response.groupModel

      }
      case AUTHORIZATION_FAILED:

        return {
          ...state,
          authorized: false,
          authorizing: false,
          isSignedIn: false
        }

    default:
      return state
  }
}
