#!/bin/bash

git fetch && git merge origin/master

TAG=$(cat docker-compose.yml | grep biohacks\: | cut -d':' -f3)

# b/c docker-compose cannot pull images on gcr
gcloud docker -- pull us.gcr.io/biohacks-194200/biohacks:$TAG

./backup-logs.sh
docker-compose down -v # TODO not this
docker-compose up -d
