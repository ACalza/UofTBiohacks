import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

export default class Index extends Component {
  constructor() {
    super()

    this.state = {
      count: 0
    }
  }

  tick = () => {
    this.setState({count: this.state.count + 2})
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { count  } = this.state

    return(
      <h1>Hello World, {count}</h1>
    )
  }
}

if (canUseDOM) {
  const container = document.getElementById('app')
  ReactDOM.render(<Index />, container)
}
