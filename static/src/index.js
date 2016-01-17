import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from './mount.js'
import counter from './reducers/counter.js'

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
    const { counter } = this.props

    return(
      <h1>Hello World, {counter}</h1>
    )
  }
}

const mapStateToProps = (state) => {
  const { counter } = state

  return { counter }
}

export default mount(connect(mapStateToProps)(Index), { counter })
