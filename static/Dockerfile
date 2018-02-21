FROM node:8 AS base

WORKDIR /home/node
COPY --chown=node:node ./package.json /home/node/

USER node
RUN npm install -s

COPY --chown=node:node . /home/node

ENV PATH="$PATH:./node_modules/.bin"

RUN mkdir ./dist

CMD /bin/bash -c "echo 'Webpack started...' && webpack -p && webpack --config webpack.node.js && babel-node dist/app.node.js"

FROM base AS dev

RUN webpack -p
RUN webpack --config webpack.node.js
RUN babel-node ./dist/app.node.js

