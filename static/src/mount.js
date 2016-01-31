import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import thunkMiddleware from 'redux-thunk'

import Snackbar from 'material-ui/lib/snackbar'

import './styles/vendor/bootstrap.scss'
import './styles/index.scss'

import './assets/js/bootstrap.js'

const eatSnack = () => {
  alert('eating snack')
}

// Required for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()


export default function mount(Connected, reducers) {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
  const store = createStoreWithMiddleware(combineReducers(reducers))

  const component =
    <Provider store={store}>
      <Connected />
    </Provider>

  if (canUseDOM) {
    injectTapEventPlugin()

    const container = document.getElementById('app')
    ReactDOM.render(component, container)
  } else {
    // if proper serverside render, headers['user-agent']
    GLOBAL.navigator = {userAgent: 'X'}
  }

  return component
}
