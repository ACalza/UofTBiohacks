// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Components
import Title from './components/Title'
import Navigation from './components/Navigation'
import Layout from './components/Layout'

// App container setup
let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)

// Pages
import Home from './pages/Home'
import Register from './pages/Register'

// Main render
ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Home} />
    <Route path="/register" component={Register} />
  </Router>,
  appContainer
)
