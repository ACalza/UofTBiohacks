"use strict"
const express = require('express');
const mongo_express = require('mongo-express/lib/middleware')
const mongo_express_config = require('./mongo_express_config')
let app = express();
const port = 6009
app.use('/', mongo_express(mongo_express_config))

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
