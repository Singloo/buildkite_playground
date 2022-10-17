# usr/bin/bash
set -x
docker-compose -f ./docker/docker-compose.prod.yml up
docker-compose -f ./docker/docker-compose.prod.yml down