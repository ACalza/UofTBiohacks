import { AUTHORIZED_USER, AUTHORIZING_USER } from '../constants/actions.js'
import { BASE_URI } from '../constants/uris.js'
import fetch from 'isomorphic-fetch'

// export const authenticatedUser = (response) => {
//   return { type: AUTHORIZED_USER, response }
// }

function authorizing(){
  return { type: AUTHORIZING_USER }
}
function authorizedUser(response){
  return { type: AUTHORIZED_USER, response }
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
          //authenticated
          if(json.userModel){
            dispatch(authorizedUser(json))
          }else{
            //redirect to login page
          }

        }
      ).catch(err => {
        console.error(err)
        dispatch(openSnack("Internal Server Error, please try again"))
      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
