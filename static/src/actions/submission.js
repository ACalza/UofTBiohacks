import { SUBMIT_FORM, CAN_SUBMIT, CAN_NOT_SUBMIT, SUBMIT_REQUEST} from '../constants/actions.js'
import fetch from 'isomorphic-fetch'

export const canSubmit = () => {
  return { type: CAN_SUBMIT }
}
export const canNotSubmit = () => {
  return { type: CAN_NOT_SUBMIT }
}

export const submitRequest = (model) => {
  return { type: SUBMIT_FORM, model }
}

export const submitResponse = (response) => {
  console.log(response)
  //TODO Add status, error, response, message
  return { type: SUBMIT_RESPONSE, response}
}


export function fetchJSON(jwt) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestPosts(subreddit))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receivePosts(subreddit, json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}
