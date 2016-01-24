import { OPEN_SNACK, EAT_SNACK } from '../constants/actions.js'

const initialState = {
  isNotInGroup: true,
  isInGroup: false,
  hasInvites: false,
  groupModel: null,
  userModel: null
}

export default function snacker(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      const { message } = action
      return { open: true, message }
    default:
      return state
  }
}
