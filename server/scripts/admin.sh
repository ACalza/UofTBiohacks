#!/bin/bash

curl -X POST http://localhost:3000/user/register \
    -d '{"email": "igem@g.skule.ca", "password": "password", "name": "AS", "username": "admin"}' \
    -H "Content-Type:Application/json"
