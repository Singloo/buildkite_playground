# usr/bin/bash
set -x
docker-compose -f ./docker/docker-compose.prod.yml up
ls
docker-compose -f ./docker/docker-compose.prod.yml down