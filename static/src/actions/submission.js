import { SUBMIT_FORM, CAN_SUBMIT, CAN_NOT_SUBMIT, SUBMIT_RESPONSE} from '../constants/actions.js'

export const canSubmit = () => {
  return { type: CAN_SUBMIT }
}
export const canNotSubmit = () => {
  return { type: CAN_NOT_SUBMIT }
}

export const submitForm = (model) => {
  return { type: SUBMIT_FORM, model }
}

export const submitResponse = (response) => {
  return { type: SUBMIT_RESPONSE, response}
}
