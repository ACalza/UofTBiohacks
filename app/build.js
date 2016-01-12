import Home from './src/pages/Home'
import { Provider } from 'react-redux'
import fs from 'fs'
import {renderToString } from 'react-dom/server'
fs.writeFile('home.html', renderToString(Home), function(err, data){
  if(err) {
    console.error(err)
  }else{
    console.log(data)
  }
})
