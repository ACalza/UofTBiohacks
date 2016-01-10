import React, { Component } from 'react'

import Title from './Title'
import BSContainer from '../components/BSContainer'
import Navigation from '../containers/Navigation'
import Footer from './Footer'

export default class Layout extends Component {
  render() {
    const { title } = this.props

    return(
      <div>
        <Navigation title=""/>
        {title ? <Title title={title} /> : null}
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
