import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'


export function pageGen(Wrapped, reducer) {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <Wrapped />
    </Provider>
  )
}

export function mount(component) {
  if (canUseDOM) {
    const container = document.getElementById('app')
    ReactDOM.render(component, container)
  }
}
