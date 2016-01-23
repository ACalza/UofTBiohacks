import { SUBMIT_FORM, CAN_SUBMIT, CAN_NOT_SUBMIT, SUBMIT_RESPONSE } from '../constants/actions.js'

//import immutable from 'immutable'

const initialState = {
  canSubmit: false,
  isLoading: false,
  response: null
}

export default function submission(state = initialState, action) {

  switch (action.type) {
    case SUBMIT_FORM:
      return {
        ...state,
        isLoading: true
      }
    case SUBMIT_RESPONSE:
      return {
        ...state,
        isLoading: false,
        response: action.response
      }
    case CAN_SUBMIT:
      return {
        ...state,
        canSubmit: true
      }
    case CAN_NOT_SUBMIT:
      return {
        ...state,
        canSubmit: false
      }
    default:
      return state
  }
}
