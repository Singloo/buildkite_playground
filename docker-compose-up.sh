# usr/bin/bash
pwd
docker-compose -f ./docker/docker-compose.prod.yml up
ls
docker-compose -f ./docker/docker-compose.prod.yml down