import React from 'react'
import ReactDOM from 'react-dom'

let appContainer = document.createElement('div')
appContainer.id = 'appContainer'
document.body.appendChild(appContainer)

let app = <h1>UofT BioHacks</h1>

ReactDOM.render(app, appContainer)
