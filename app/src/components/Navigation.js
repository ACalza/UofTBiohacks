import React from 'react'
import PureComponent from 'react-pure-render/component'
import { Link } from 'react-router'

export default class Button extends PureComponent {
  render() {
    const { links } = this.props

    return(
      <nav>
        {links.map( (link, i) => {
          let linkName
          if (link === '/') {
            linkName = 'Home'
          } else {
            linkName = link.substr(1)
          }

          return <Link to={link} key={i}> {linkName} </Link>
        })}
      </nav>
    )
  }
}
