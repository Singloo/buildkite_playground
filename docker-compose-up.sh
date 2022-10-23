# usr/bin/bash
docker-compose -f ./docker/docker-compose.prod.yml up
ls ./build
node ./scripts/logDir.js
docker-compose -f ./docker/docker-compose.prod.yml down