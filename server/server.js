'use strict'

const koa = require('koa');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const util = require('./util');
const cors = require('kcors');
const jwt = require('koa-jwt');
const port = 3000;
let app = koa();


// Global middleware
app.use(require('koa-validate')());
app.use(cors())
app.use(bodyParser())  //parsing POST form data and populate req.body

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


// Reset 15 minutes at each request: set cookie maximum age


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


// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: 'adfjostq4tu2489r3892h23h89ipunchedkeyboad' }).unless({ path: ["/user/login", "/user/register"] }));

// Protected middleware



//routes
require('./routes/user')(app)
require('./routes/group')(app)

app.listen(port)
console.log(`Koa server listening on port ${port}`)
