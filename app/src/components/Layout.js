import React, { Component } from 'react'

import Title from './Title'
import Navigation from './Navigation'

export default class Layout extends Component {
  render() {
    const { title } = this.props
    const navLinks = ['/', '/register']


    return(
      <div>
        <Navigation links={navLinks} />
        <Title title={title} />
        {this.props.children}
      </div>
    )
  }
}
