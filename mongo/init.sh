mongo $MONGO_DB --eval "db.createUser({ user: '$MONGO_USER', pwd: '$MONGO_PASS', roles: [ 'readWrite' ] })"
