# usr/bin/bash
set -x
chmod a+rw .
docker-compose -f ./docker-compose.prod.yml up
ls
docker-compose -f ./docker-compose.prod.yml down