// Imports
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Account from './pages/Account'
import Login from './pages/Login'

// Containers
import Index from './containers/Index'

// Redux Store
import configureStore from './store/configureStore'

// Browser History
import history from './util/history'

// Required for material-ui
injectTapEventPlugin()

// App container setup
let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)

// Get initial store
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
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
