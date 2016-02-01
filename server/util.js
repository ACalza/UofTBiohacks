'use strict'
let config = require('./config');
const bcrypt = require("bcrypt");
const Promise = require('bluebird')

module.exports = {
  /**
   * Handles errors and returns a JSON
   * @param  Koa Context ctx
   * @return N/A
   */
  errorResponse: function(ctx) {
    ctx.body = {
      message: "Whoops, something went wrong, please try again!",
      errorcode: ctx.response.status
    }

  },
  /**
   * encrypts the password (8 bit hashing)
   * TODO convert to callback
   */
  bcrypt: function(password) {
    return bcrypt.hashSync(password, 8) // Auto-generate a salt (8) and hash the password and salt
  },

  bcryptHashAsync: function(password) {
    return new Promise( (resolve, reject) => {
      bcrypt.hash(password, 8, (err, hash) => {
        if (err) return reject(err)

        resolve(hash)
      })
    })
  },

  bcryptCompareAsync: function(password, hash) {
    return new Promise( (resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) return reject(err)

        resolve(res)
      })
    })
  },

  trim: function(string) {
    if (string === undefined || string === null) {
      return string
    }
    return string.trim()
  }


}

// hashing the password is like passing the password through a one-way function
// match with hashed password in the database and check if the user enters the correct password against hash

// salt is  a random data that is used to add additional string to a one-way function that 'hashes' a password
// to defend against dictionary attacks
// a new salt is randomly generated for each password
// most of the time, salt and hash is concatenated and processed with a hash function
