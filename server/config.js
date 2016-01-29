const shared = require('../shared/constants')

var url = null
if(process.env.NODE_ENV === 'prod'){
  url = shared.prod.STATIC_URL
}else{
  url = shared.dev.STATIC_URL
}

module.exports = {
    SECRET: "adfjostq4tu2489r3892h23h89ipunchedkeyboad",
    api_key: "5Vm-WVX-4My-mr2",
    api_user: "iGemUofT",
    FRONT_END_URL: url
}

// get 'prod' config from shared using process.env.NODE_ENV === 'prod' or 'dev'
