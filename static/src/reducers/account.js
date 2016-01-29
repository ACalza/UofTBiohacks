import { AUTHORIZING_USER, AUTHORIZED_USER, AUTHORIZATION_FAILED} from '../constants/actions.js'

const initialState = {
  isInGroup: false,
  hasInvites: false,
  authorizing: true,
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
      return handleAuthorizedUser(state, action.response)

    case AUTHORIZATION_FAILED:
        return {
          ...state,
          authorized: false,
          authorizing: false
        }
    default:
      return state
  }
}
function handleAuthorizedUser(state, response){
  let def = {
    authorizing: false,
    authorized: true,
    isInGroup: false,
    hasInvites: false,
    userModel: response.userModel,
    groupModel: response.groupModel
  }
  if(response.groupModel){
    return {
      ...state,
      ...def,
      isInGroup: true
    }
  }else if(response.userModel.invites.length > 0){
    return {
      ...state,
      ...def,
      hasInvites: true
    }
  }else{
    return {
      ...state,
      ...def
    }
  }
}
