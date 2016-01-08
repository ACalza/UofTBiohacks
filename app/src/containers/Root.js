// Libraries
import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

// Browser History
import history from '../util/history'

// Main container
import Index from '../containers/Index'

// Pages
import Home from '../pages/Home'
import Register from '../pages/Register'
import Account from '../pages/Account'
import Login from '../pages/Login'

export default class Root extends Component {
  render() {
    return(
      <Provider store={this.props.store}>
        <Router history={history}>
          <Route path="/" component={Index} >
            <IndexRoute component={Home}/>
            <Route path="/register" component={Register} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
