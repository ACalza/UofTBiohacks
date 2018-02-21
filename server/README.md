# Hackathon API

To register quickly (username is `bob`, password is `password`):

```
curl -X POST -H 'Content-Type:application/json' \
-d "$(cat example-bodies/register.json | EMAIL=youremail envsubst)" \
localhost:3000/user/register
```
