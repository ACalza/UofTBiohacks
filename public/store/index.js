import { createStore, combineReducers } from 'redux'

import user from '../reducers/user.js'

export default function configureStore(initialState) {
  const store = createStore(user, initialState)

  return store
}
