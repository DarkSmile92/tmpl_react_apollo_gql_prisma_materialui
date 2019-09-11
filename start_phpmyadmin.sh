#!/bin/sh
echo "Get ip of docker container and set PMA_HOST"
# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
docker stop myadmin
docker container rm myadmin
docker run --name myadmin -e PMA_HOST=172.18.0.2 -e PMA_PORT=3306 -e PMA_USER=root -e PMA_PASSWORD=prisma -d --network root_default --publish 8080:80 phpmyadmin/phpmyadmin
