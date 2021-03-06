#!/bin/bash

docker cp ../../db_config/config_tables.sql test-faceoff-db:/config.sql

while true; do
  docker exec -i test-faceoff-db /bin/bash -c 'mysql -u root -ppassword -h test-faceoff-db < /config.sql; exit $?'
  if [ $? -eq 0 ]; then
    break
  fi
  echo .
  sleep 1
done

echo "database is up"
