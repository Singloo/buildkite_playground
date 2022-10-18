# usr/bin/bash
set -x
docker-compose -f ./docker-compose.prod.yml up
ls
docker-compose -f ./docker-compose.prod.yml down