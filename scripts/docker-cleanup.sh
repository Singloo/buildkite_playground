echo "---- cleaning docker container ----"

docker container prune -f

echo "--- cleaning docker network ----"

docker network prune -f


echo "--- cleaning docker volume ----"

docker volume prune -f


echo "--- cleaning docker images without name ----"

# docker images | grep none | awk '{print $3}' | xargs docker rmi