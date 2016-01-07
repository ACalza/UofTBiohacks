import React from 'react'
import PureComponent from 'react-pure-render/component'
import { Link } from 'react-router'

import '../styles/Navigation.scss'

export default class Button extends PureComponent {
  render() {
    const { links } = this.props

    return(
      <nav className="Navigation">
        {links.map( (link, i) => {
          let linkName
          if (link === '/') {
            linkName = 'home'
          } else {
            linkName = link.substr(1)
          }

          return <Link to={link} key={i} className="navLink"> {linkName} </Link>
        })}
      </nav>
    )
  }
}
