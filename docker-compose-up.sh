# usr/bin/bash
set -x
docker-compose -f ./docker/docker-compose.prod.yml --rm up
ls