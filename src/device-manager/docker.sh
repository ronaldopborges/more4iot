#!/bin/sh

docker build -t  .
docker run --network cestao --ip 172.18.0.2 -p 3000:3000 -d --name nfce-service nfce-service