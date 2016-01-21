import { SUBMIT_FORM, CAN_SUBMIT, CAN_NOT_SUBMIT, SUBMIT_RESPONSE } from '../constants/actions.js'

//import immutable from 'immutable'

const initialState = {
  submit: false,
  canSubmit: false,
  loading: false,
  loaded: false,
  response: null
}

export default function submission(state = initialState, action) {

  switch (action.type) {
    case SUBMIT_FORM:
      return {
        ...state,
        submit: true,
        loading: true
      }
    case SUBMIT_RESPONSE:
      return {
        ...state,
        loading: false,
        loaded: true,
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
