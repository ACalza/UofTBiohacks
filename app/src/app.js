// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import Title from './components/Title'

// App container setup
let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)

const home = <Title title="UofT BioHacks" />
const register = <Title title="Register" />

// Main render
ReactDOM.render(home, appContainer)
