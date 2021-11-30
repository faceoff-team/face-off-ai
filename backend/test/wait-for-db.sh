#!/bin/bash

while true; do
  docker exec -i test-faceoff-db /bin/sh -c 'mysqladmin ping; exit $?'
  echo $?
  if [ $? -eq 0 ]; then
    break
  fi
  echo .
  sleep 1
done

echo "database is up"
