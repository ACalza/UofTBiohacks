#!/usr/bin/env bash

export APP_ID=`docker inspect uoftbiohacks_caddy_1 --format "{{.ID}}"`

export APP_TAG=`docker inspect ${APP_ID} --format "{{.Config.Image}}" | cut -d'/' -f2`

export THE_DATE=`date +%Y-%m-%dT%H:%M:%SZ`

export APP_LOGS_GZIP="caddy-${APP_TAG}-${THE_DATE}-json.log.gz"

sudo cat /var/lib/docker/containers/$APP_ID/${APP_ID}-json.log | gzip > ~/logs/$APP_LOGS_GZIP
echo "Backd up $APP_LOGS_GZIP locally"
