// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from './store/configureStore'

// Components
import Title from './components/Title'
import Navigation from './components/Navigation'
import Layout from './components/Layout'

// App container setup
let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)

// Get initial store
const store = configureStore()

// Pages
import Home from './pages/Home'
import Register from './pages/Register'

class App extends React.Component {
  render() {
    const { actions, logged } = this.props

    return (
      <div>
        <span>{logged.toString()}</span>
        <button onClick={actions.logIn}> Log In </button>
        <button onClick={actions.logOut}> Log Out </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

import { bindActionCreators } from 'redux'
import * as LoggedActions from './actions/logged'

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(LoggedActions, dispatch)
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

import { connect } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  appContainer
)

// Main render
// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={createBrowserHistory()}>
//       <Route path="/" component={Home} />
//       <Route path="/register" component={Register} />
//     </Router>
//   </Provider>,
//   appContainer
// )
