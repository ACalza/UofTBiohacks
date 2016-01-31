import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from './mount.js'
import counter from './reducers/counter.js'

import snacker from './reducers/snacker.js'
import Layout from './components/Layout'

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
      <Layout push>
        <div>
          <h1>Hello World, {counter}</h1>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ counter, snacker }) => ({ counter, snacker })

export default mount(connect(mapStateToProps)(Index), { counter, snacker })
