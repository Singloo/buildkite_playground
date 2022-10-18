# usr/bin/bash
set -x
chmod a+rw ./src/*
chmod a+rw ./src/
chmod a+rw ./src
docker-compose -f ./docker-compose.prod.yml up
ls
docker-compose -f ./docker-compose.prod.yml down