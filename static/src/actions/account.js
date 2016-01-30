import { AUTHORIZED_USER, AUTHORIZING_USER, AUTHORIZATION_FAILED } from '../constants/actions.js'
import { BASE_URI } from '../constants/uris.js'
import fetch from 'isomorphic-fetch'
import Promise from 'bluebird'
import {openSnack} from '../actions/snacker'

function authorizing() {
  return { type: AUTHORIZING_USER }
}
function authorizedUser(response){
  return { type: AUTHORIZED_USER, response }
}
function failAuthorization(){
  return {type: AUTHORIZATION_FAILED }
}

export const authorize = (uri, options={}) => {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    dispatch(authorizing())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    return fetch(uri, options)
      .then(response => response.json())
      .then(json => {
          //authenticated
          if(json.userModel){
            dispatch(authorizedUser(json))
          }else{
            dispatch(failAuthorization())
          }
          if(json.message){
            dispatch(openSnack(json.message))
          }

        }
      ).catch(err => {
        console.error(err)
        dispatch(failAuthorization())

      })

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
