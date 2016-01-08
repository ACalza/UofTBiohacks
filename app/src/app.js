// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin'
import "babel-polyfill"
import configureStore from './store/configureStore'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Account from './pages/Account'
import Login from './pages/Login'

// Containers
import Index from './containers/Index'


// Required for material-ui
injectTapEventPlugin()

// App container setup
let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)

// Get initial store
const store = configureStore()


import FMUI, { FormsyText, FormsyToggle } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={Index} >
        <IndexRoute component={Home}/>
        <Route path="/register" component={Register} />
        <Route path="/account" component={Account} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  appContainer
)
