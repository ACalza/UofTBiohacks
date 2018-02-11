# UofTBiohacks

## Getting Started

```bash
cp sample.env .env
# fill out values in .env
docker-compose -f docker-compose.dev.yml up -d db
docker-compose -f docker-compose.dev.yml up api
```

See [./server](./server) for commands to test api + db is working.

(TODO add frontend to docker compose)

```bash
cd static
# edit ./static/src/constants/uris.js to point to wherever the api is available
./node_modules/.bin/webpack # build .js files
./node_modules/.bin/webpack --config webpack.node.js # builds ./dist/app.node.js
./node_modules/.bin/babel-node ./dist/app.node.js # builds html

# OR
cd static
# build static data container
docker build -t hackathon-static .
cd ..
# modify Caddyfile as appropiate
docker-compose -f docker-compose.prod.yml up -d # caddy uses volume from static container
```

UofT Biohacks Registration and Group Management Application

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

<img src='https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png' alt='Redux Logo with Dark Title' width='500'>

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
