'use strict'

const koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
let app = koa()

app.keys = ['h4ckerbio']

mongoose.connect('mongodb://biohacks:hacker@ds037095.mongolab.com:37095/biohacks', {
  user: 'biohacks',
  pass: 'hacker'
})

// Global middleware
app.use(bodyParser())

// Reset 15 minutes at each request
app.use(session({maxAge: 900000}, app))

app.use(function* (next) {
  this.type = 'json'
  yield next
})

// logger
app.use(function* (next) {
  var start = new Date
  yield next
  var ms = new Date - start
  this.set('X-Response-Time', ms + 'ms')
  console.log('%s %s - %s', this.method, this.url, ms)
})

//routes
require('./routes/user')(app)
require('./routes/group')(app)

app.listen(3000)
