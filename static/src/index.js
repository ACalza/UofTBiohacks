import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import { mount, pageGen } from './mount.js'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    default: return state
  }
}

const store = createStore(counter)

class Index extends Component {
  tick = () => {
    const { dispatch } = this.props
    dispatch({type: 'INCREMENT'})
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { count } = this.props

    return(
      <h1>Hello World, {count}</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state
  }
}

const page = pageGen(connect(mapStateToProps)(Index), store)

export default page

mount(page)
