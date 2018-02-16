FROM node:8 AS dev


WORKDIR /home/node
COPY --chown=node:node ./package.json /home/node/

USER node
RUN npm install -s

COPY --chown=node:node . /home/node

RUN ./node_modules/.bin/webpack -p
RUN ./node_modules/.bin/webpack --config webpack.node.js
RUN ./node_modules/.bin/babel-node ./dist/app.node.js

ENV PATH="$PATH:./node_modules/.bin"

FROM tianon/true as prod

WORKDIR /app
COPY --from=0 /home/node/dist .
