import { OPEN_SNACK, EAT_SNACK } from '../constants/actions.js'

const initialState = {
  open: false,
  message: ""
}

export default function snacker(state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACK:
      const { message } = action
      return { open: true, message }
    case EAT_SNACK:
      return initialState
    default:
      return state
  }
}
