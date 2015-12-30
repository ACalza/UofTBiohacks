'use strict'

const koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const util = require('./util');
const config = require('./config');
const cors = require('kcors');
const jwt = require('koa-jwt');
const authUser = require('./auth/authuser');
const port = process.env.PORT || 3000;


let app = koa();

// Connect to database
if (process.env.mongodblocal === 'true') {
  mongoose.connect('mongodb://localhost/biohacks')
} else {
  mongoose.connect('mongodb://biohacks:hacker@ds037095.mongolab.com:37095/biohacks', {
    user: 'biohacks',
    pass: 'hacker'
  })
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongoDB')
});

// Global middleware
app.use(require('koa-validate')());

app.use(cors())

app.use(bodyParser())  //parsing POST form data and populate req.body

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


app.use(jwt({ secret: config.SECRET }).unless({ path: ["/user/login", "/user/register"] }));

authUser.unless = require('koa-unless');
app.use(authUser.unless({path: ["/user/login", "/user/register"] }));

//routes
require('./routes/user')(app)
require('./routes/group')(app)

app.listen(port)
console.log(`Koa server listening on port ${port}`)
