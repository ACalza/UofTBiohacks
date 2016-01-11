import React, { Component } from 'react'

import Title from './Title'
import BSContainer from '../components/BSContainer'
import Navigation from '../containers/Navigation'
import Footer from './Footer'

export default class Layout extends Component {
  render() {
    const { title, push } = this.props


    let outerStyles = {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }
    let innerStyles = { flex: '1' }

    return (
      <div className="fillY" style={outerStyles}>
        <div className="content" style={innerStyles}>
          {push ? <div className="headerPush" /> : null}
          <Navigation title=""/>
          {title ? <Title title={title} /> : null}
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
