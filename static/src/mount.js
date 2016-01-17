import React from 'react'
import ReactDOM from 'react-dom'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

export function mount(component) {
  if (canUseDOM) {
    const container = document.getElementById('app')
    ReactDOM.render(component, container)
  }
}
