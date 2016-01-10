// Libraries
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PureComponent from 'react-pure-render/component'
import classNames from 'classnames'

// Actions
import * as LoggedActions from '../actions/logged'

// Components
// import { Navbar, Nav}
import BSContainer from '../components/BSContainer'

// Styles
import '../styles/Navigation.scss'

// Presentational Component
class Navigation extends PureComponent {
  render() {
    const { logOut } = this.props.actions
    const { jwt, title } = this.props

    // TODO Routes should come from constants
    // TODO extend a base links
    // NOTE !logout renders as bare <a>
    const routes = {
      whenLoggedIn: ['/', '/account', '!logout'],
      whenLoggedOut: ['/', '/register', '/login' ]
    }

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

    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <BSContainer>

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">{title}</a>
          </div>

          <div id="navbar" className="navbar-collapse collapse" aria-expanded="false">
            <ul className="nav navbar-nav navbar-right">
              {links}
            </ul>
          </div>

        </BSContainer>
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
