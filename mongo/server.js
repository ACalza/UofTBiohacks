"use strict"
const express = require('express');
const mongo_express = require('mongo-express/lib/middleware')
const mongo_express_config = require('./mongo_express_config')
let app = express();

app.use('/mongo_express', mongo_express(mongo_express_config))

app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});
