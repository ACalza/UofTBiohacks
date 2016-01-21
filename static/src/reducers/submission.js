import { SUBMIT_FORM, CAN_SUBMIT } from '../constants/actions.js'
//import immutable from 'immutable'

const initialState = {
  submit: false,
  canSubmit: false,
  loading: false,
  loaded: false
}

export default function snacker(state = initialState, action) {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        ...state,
        submit: true,
        loading: true
      }
    case CAN_SUBMIT:
      return {
        ...state,
        canSubmit: true
      }
    default:
      return state
  }
}
