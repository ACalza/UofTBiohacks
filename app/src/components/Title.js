import React from 'react'
import PureComponent from 'react-pure-render/component'

import '../styles/Title.scss'

export default class Title extends PureComponent {
  render() {
    const { title } = this.props

    return(<h1 className="Title">{title}</h1>)
  }
}
