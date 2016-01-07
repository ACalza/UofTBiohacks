// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './store/configureStore'

// Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

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
  <Formsy.Form>
      onValid = {() => alert('valid')}
      onInvalid = {() => alert('invalid')}
      onValidSubmit = {() => alert('validsubmit')}>

      <FormsyText style={{display: 'block'}}
        required
        name = 'email'
        validations="isEmail"
        validationError={'Invalid email'}
        hintText = "What is your email?"
        floatingLabelText = "Email"
      />

    <RaisedButton> Register </RaisedButton>
  </Formsy.Form>,
  appContainer
)

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={createBrowserHistory()}>
//       <Route path="/" component={Home} />
//       <Route path="/register" component={Register} />
//       <Route path="/login" component={Login} />
//     </Router>
//   </Provider>,
//   appContainer
// )
