import { SUBMIT_FORM, CAN_SUBMIT, CAN_NOT_SUBMIT} from '../constants/actions.js'

export const canSubmit = () => {
  return { type: CAN_SUBMIT }
}
export const canNotSubmit = () => {
  return { type: CAN_NOT_SUBMIT }
}

export const submitForm = (data) => {
  return { type: SUBMIT_FORM, data }
}
