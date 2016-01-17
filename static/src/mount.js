import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'


export default function mount(Connected, reducer) {
  const store = createStore(reducer)

  const component =
  <Provider store={store}>
    <Connected />
  </Provider>

  if (canUseDOM) {
    const container = document.getElementById('app')
    ReactDOM.render(component, container)
  }

  return component
}
