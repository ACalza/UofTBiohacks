// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Components
import Title from './components/Title'
import Navigation from './components/Navigation'

// App container setup
let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)


const navLinks = ['/', '/register']

class Home extends React.Component {
  render() {
    return (
      <div>
        <Title title="UofT BioHacks" />
        <Navigation links={navLinks} />
      </div>
    )
  }
}

class Register extends React.Component {
  render() {
    return (
      <div>
        <Title title="Register" />
        <Navigation links={navLinks} />
      </div>
    )
  }
}

// Main render
ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Home} />
    <Route path="/register" component={Register} />
  </Router>,
  appContainer
)
