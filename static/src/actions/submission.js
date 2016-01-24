import { SUBMITED_FORM, CAN_SUBMIT, CAN_NOT_SUBMIT, SUBMIT_RESPONSE} from '../constants/actions.js'
import fetch from 'isomorphic-fetch'
import {openSnack} from '../actions/snacker'
import { routeActions } from 'react-router-redux'

export const canSubmit = () => {
  return { type: CAN_SUBMIT }
}
export const canNotSubmit = () => {
  return { type: CAN_NOT_SUBMIT }
}

function submitedForm(){
  return { type: SUBMITED_FORM }
}

function submitResponse(response){
  return { type: SUBMIT_RESPONSE, response}
}
export const loadResponse = (uri, requestObject = {}) => {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(submitedForm())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    return fetch(uri, requestObject)
      .then(response => response.json())
      .then(json =>
        {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
          console.log("At submissiona action", json)
          //Implies they are logging in
          if(json.token){
            dispatch(routeActions.push('/account'))
            dispatch(routeActions.goForward())
          }
          dispatch(openSnack(json.message))
          dispatch(submitResponse(json))
        }
      ).catch(err => {
        console.error(err)
        dispatch(openSnack("Internal Server Error, please try again"))
      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
