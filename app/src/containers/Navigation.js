// Libraries
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureComponent from 'react-pure-render/component'
import classNames from 'classnames'

// Actions
import * as LoggedActions from '../actions/logged'

// Styles
import '../styles/Navigation.scss'

// Presentational Component
class Navigation extends PureComponent {
  render() {
    const { logOut } = this.props.actions
    const { jwt } = this.props

    // TODO Routes should come from constants
    // TODO extend a base links
    // NOTE !logout renders as bare <a>
    const routes = {
      whenLoggedIn: ['/', '/account', '!logout'],
      whenLoggedOut: ['/', '/register', '/login' ]
    }


    const navClass = classNames({
      // 'Navigation': true,
      'nav': true,
      'nav-inline': true
    })

    // TODO conditionally style active link with redux-history
    const linksClass = classNames({
      // 'navLink': true,
      'nav-link': true
    })

    const linkPusher = (routes) => {
      // console.log(this.props.actions.logOut)
      let links = []

      routes.forEach( (link, i) => {
        if (link === '/')
          links.push(<li key={i}><Link to={link} className={linksClass}>home</Link></li>)

        if (link.charAt(0) === '/' && link !== '/')
          links.push(<li key={i}><Link to={link} className={linksClass}>{link.substr(1)}</Link></li>)

        if (link === '!logout')
          links.push(<li key={i}><a onClick={logOut} className={linksClass}>log out</a></li>)
      })

      return links
    }

    let links = ( () => {
      if (jwt !== null) {
        return linkPusher(routes.whenLoggedIn)
      } else {
        return linkPusher(routes.whenLoggedOut)
      }
    })()

    return (
      <nav role="navigation" className={navClass}>
        <ul className="nav nav-pills">
          {links}
        </ul>
      </nav>
    )
  }
}

// Bindings into state and dispatch
const mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(LoggedActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
