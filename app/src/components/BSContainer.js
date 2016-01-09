import React from 'react'
import PureComponent from 'react-pure-render/component'

export default class BSContainer extends PureComponent {
  render() {
    const { children } = this.props

    return(
      <div className="container">
        {children}
      </div>
    )
  }
}
