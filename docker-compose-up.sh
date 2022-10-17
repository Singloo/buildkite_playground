# usr/bin/bash
set -x
docker-compose -f ./docker/docker-compose.prod.yml up
# node ./scripts/logDir.js
ls
cd ./public
ls
cd ../src
ls
docker-compose -f ./docker/docker-compose.prod.yml down