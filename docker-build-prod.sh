docker build -f ./docker/Dockerfile -t playground/buildkite .
docker-compose -f ./docker/docker-compose.prod.yml up