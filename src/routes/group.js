"use strict"
const Router = require('koa-router');
const User = require('../models/user');
const Group = require('../models/group');

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

    router.use('/create', validateGroup)
    /**
     * Create a group
     */
     router.post('/create', function*(){

     });
}
function* validateGroup(next){

}
