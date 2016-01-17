import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import Snackbar from 'material-ui/lib/snackbar'

const eatSnack = () => {
  alert('eating snack')
}

// Required for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'


export default function mount(Connected, reducers) {
  const store = createStore(combineReducers(reducers))

  // GLOBAL.navigator = {userAgent: headers['user-agent']}

  const component =
    <Provider store={store}>
      <Connected />
    </Provider>

  if (canUseDOM) {
    injectTapEventPlugin()

    const container = document.getElementById('app')
    ReactDOM.render(component, container)
  }

  return component
}
