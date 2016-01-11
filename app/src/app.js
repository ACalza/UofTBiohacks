import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root'

// Redux Store
import initializeStore from './store/initializeStore'

// Required for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// App container setup
let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)

// Get initial store
const store = initializeStore()

ReactDOM.render(<Root store={store} /> ,appContainer)

import './assets/js/flowtype.js'
$('#intro').flowtype({minFont: 14})
