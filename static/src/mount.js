import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'
import thunkMiddleware from 'redux-thunk'

import './styles/vendor/bootstrap.scss'
import './styles/index.scss'

// import './assets/js/bootstrap.js'

// Required for material-ui atm.
import injectTapEventPlugin from 'react-tap-event-plugin'

export default function mount(Connected, reducers) {
  let component

  if (reducers) {
    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
    const store = createStoreWithMiddleware(combineReducers(reducers))
    component = <Provider store={store}>
      <Connected />
    </Provider>
  } else {
    component = <Connected />
  }

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
