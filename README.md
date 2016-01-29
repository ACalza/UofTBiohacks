# UofTBiohacks

UofT Biohacks Registration and Group Management Application

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

To run RESTful JSON API ([koa](http://koajs.com/)):

```bash
cd server
npm install
node server.js
```

To run pre-rendered static frontend (React, redux, webpack):

```bash
cd static
npm install

# pre-build static files
npm run build
# build out bundled+splitting scripts
webpack

# serve static content
npm run start
```
