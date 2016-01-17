import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'


export function pageGen(Wrapped, store) {
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
