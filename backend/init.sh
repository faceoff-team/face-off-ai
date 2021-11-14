#!/bin/bash

set -eu

echo "Checking MySQL Connection"

i=0
until [ $i -ge 10 ]
do
  nc -z db 3306 && break

  i=$(( i + 1 ))

  echo "$i: Sleep 1 Second"
  sleep 1
done

if [ $i -eq 10 ]
then
  echo "MySQL connection refused."
  exit 1
fi

echo "MySQL ready to accept connections"

node main.js