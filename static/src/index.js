import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    default: return state
  }
}

const store = createStore(counter)

export default class Index extends Component {
  constructor() {
    super()

    this.state = {
      count: 0
    }
  }

  tick = () => {
    const { store } = this.props
    store.dispatch({type: 'INCREMENT'})
    this.setState({count: store.getState()})
  };

  componentDidMount() {
    const { store } = this.props

    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { count } = this.state

    return(
      <Provider store={store}>
        <h1>Hello World, {count}</h1>
      </Provider>
    )
  }
}

if (canUseDOM) {
  const container = document.getElementById('app')
  ReactDOM.render(<Index store={store}/>, container)
}
