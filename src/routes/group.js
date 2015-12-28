"use strict"
let Router = require('koa-router');
let User = require('../models/user');
let Group = require('../models/group');

/**
 * API for creating groups
 * @param  Koa app
 * @return N/A
 */
function group(app){
    //API for /group/
    let router = new Router({
        prefix: '/group'
    });

    /**
     * Create a group
     */
     router.post('/create', function*(){

     });
}
