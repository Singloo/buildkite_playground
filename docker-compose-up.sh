# usr/bin/bash
set -x
docker-compose -f ./docker/docker-compose.prod.yml up
node ./scripts/logDir.js
docker-compose -f ./docker/docker-compose.prod.yml down