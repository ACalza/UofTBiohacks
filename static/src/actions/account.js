import { AUTH_USER, AUTHORIZING } from '../constants/actions.js'
import { BASE_URI } from '../constants/uris.js'

export const authUser = (message) => {
  return { type: OPEN_SNACK, message }
}

function authorizing(){
  return { type: AUTHORIZING }
}

function submitResponse(response){
  return { type: SUBMIT_RESPONSE, response}
}
export const authorize = () => {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(authorizing())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    return fetch(BASE_URI + '/user/auth', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.jwt
      }
    })
      .then(response => response.json())
      .then(json => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

          //Implies they are logging in
          //At this point it can be assumed your browser supports it

          console.log(json)
        }
      ).catch(err => {
        console.error(err)
        dispatch(openSnack("Internal Server Error, please try again"))
      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
