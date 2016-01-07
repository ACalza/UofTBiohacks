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
    const { logged } = this.props.store.getState()
    console.log(logged)

    return (
      <span>{logged.toString()}</span>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     logged: state
//   }
// }

// const AppContainer = connect(mapStateToProps)(App)

import { connect } from 'react-redux'

ReactDOM.render(
  <App store={store} />,
  appContainer
)

// ReactDOM.render(
//   <Provider store={store} >
//     <App store={store} />
//   </Provider>,
//   appContainer
// )


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
