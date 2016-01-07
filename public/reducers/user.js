import { ajaxPost } from '../util'

const initialState = {
  username: null,
  name: null,
  email: null,
  token: null
}

export default (state = initialState, action) {
  switch(action.type) {
    case 'LOG_IN':
      ajaxPost(action.request.body, action.request.uri, (err, data) => {
        if (err) {
          console.error(err)
          return state
        } else {
          console.log(data)
          return state
        }
      })

    case 'LOG_OUT': return initialState
    default: return state
  }
}
