"use strict"

let Router = require('koa-router');
let User = require('../models/user');
let util = require('../util');
let bcrypt = require('bcrypt');


/**
 * Register user router
 * @param  Koa app
 * @return N/A
 */
function user(app) {

    //API with prefix /user to each route
    let router = new Router({
        prefix: '/user'
    });

    /**
     * Route for registering a user
     */
    router.post('/register', function*() {
        let email = this.request.body.email;
        let password = this.request.body.password;
        let name = this.request.body.name;

        //If name, password or email does not exist
        if (!email || !password || !name) {
            this.response.status = 400;
            util.errorResponse(this);
        } else {
            let user = new User({
                email: email,
                password: util.bcrypt(password), //8 bit hashing 2^8 rounds is sufficent for now
                name: name,
                school: this.request.body.school,
                github: this.request.body.github,
                about: this.request.body.about
            });

            try {
                var model = yield user.save();
                this.body = model;
                //Start session
                this.session.userModel = model;
            } catch (err) {
                this.response.status = 500;
                console.error(err);
                util.errorResponse(this);
            }



        }

    });

    /**
     * Route for logging in a user
     */
    router.post('/login', function*() {
        let email = this.request.body.email;
        let password = this.request.body.password;
        if (!email || !password) {
            this.response.status = 400;
            util.errorResponse(this);
        } else {
            //add try catch
            try {
                var model = yield User.findOne({
                    email: email
                });

                if (bcrypt.compareSync(password, model.password)) {
                    //start session
                    this.session.userModel = model;
                    this.body = {
                        message: "logged in!"
                    }
                } else {
                    this.body = {
                        message: "Wrong password"
                    }
                }
            }catch(err){
                this.response.status = 500;
                console.error(err);
                util.errorResponse(this);
            }
        }

    });

    /**
     *  logs out user
     */
    router.get('/logout', function*(){
        this.session = null;
        this.body = {
            message: "logged out"
        }
    });
    /**
     * Temporary to test session
     */
     router.get('/session', function*(){
         this.body = this.session.userModel;
     });

    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = user
