# usr/bin/bash
set -x
pwd
docker-compose -v ./public:./public -f ./docker-compose.prod.yml up
ls
docker-compose -f ./docker-compose.prod.yml down