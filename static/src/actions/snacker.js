import { OPEN_SNACK, EAT_SNACK } from '../constants/actions.js'

export const openSnack = (message) => {
  return { type: OPEN_SNACK, message }
}

export const eatSnack = () => {
  return { type: EAT_SNACK }
}
